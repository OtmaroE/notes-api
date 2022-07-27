const express = require('express');

const { createToken } = require('../../services/user/jwt');
const db = require('../../database/models');
const auth = require('../../services/user/auth');
const logger = require('../../services/logger');
const { emailValidator, passwordValidator, verifyPassword } = require('../../services/user/validations');
const { encryptPassword } = require('../../services/user/encrypt');

const router = express.Router();

/**
 * @swagger
 * definitions:
 *  User:
 *    properties:
 *      name:
 *        type: string
 *      email:
 *        type: string
 *      isDeleted:
 *        type: boolean
 *      createdAt:
 *        type: date
 *      updatedAt:
 *        type: date
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: ['User']
 *     description: Register an user
 *     security:
 *      - BearerAuth: []
 *     requestBody:
 *        description: User record on JSON format
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/User'
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/User'
 */
router.post('/users', auth, async (req, res) => {
  const { email, password, userName } = req.body;
  try {
    emailValidator(email);
    passwordValidator(password);
    if (!userName) throw Error('userName is required');
    const hashedPassword = encryptPassword(password);
    logger.info('Attempting to create user');
    const userInstance = await db.User.create({
      email,
      password: hashedPassword,
      userName,
      isDeleted: false,
    });
    logger.info(`User created: ${userInstance.id}`);
    res.send(
      {
        id: userInstance.id,
        email: userInstance.email,
        userName: userInstance.userName,
      },
      201,
    );
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.send({ message: error.message, errors: error.errors }, 400);
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: ["User"]
 *     description: Login
 *     parameters:
 *      - name: email
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *      - name: password
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *     produces:
 *       - string
 *     responses:
 *       201:
 *         description: Token is returned
 */
router.post('/users/login', async (req, res) => {
  const { email, password } = req.query;
  try {
    logger.info('Attempting to fetch user data');
    const user = await db.User.findOne({ where: { email, isDeleted: false } });
    if (!user) throw Error('wrong email');
    verifyPassword(password, user.password);
    const token = createToken({ email: user.email, id: user.id });
    res.send(token, 200);
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.send({ message: error.message, errors: error.errors }, 400);
  }
});

/**
 * @swagger
 * /users/{userId}:
 *   patch:
 *     tags: ["User"]
 *     description: Update an user
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: id of the resource to modify
 *        required: true
 *        type: integer
 *     requestBody:
 *        description: Payload
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/User'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Updated resource
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/User'
 */
router.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password, userName } = req.body;
  try {
    logger.info(`Verifying existence of user id ${id}`);
    const user = await db.User.findByPk(id);
    if (!user) {
      logger.error(`User ${id} not found on database`);
      throw Error('User does not exists');
    }
    logger.info(`Attempting to update user id ${id}`);
    if (email) emailValidator(email);
    if (password) passwordValidator(password);
    await user.update({ email, password, userName });
    res.send(204);
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.send({ message: error.message, errors: error.errors }, 400);
  }
});

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags: ["User"]
 *     description: Delete an user
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: id of the resource to modify
 *        required: true
 *        type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: If exists, the resource will be deleted
 */
router.delete('/users/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findByPk(id);
    if (user) {
      await user.update({ isDeleted: true });
      logger.info(`Attempting to sof-delete user id: ${user.id}`);
    }
    res.send(204);
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.send({ message: error.message, errors: error.errors }, 400);
  }
});

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: ["User"]
 *     description: Fetch an user
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: id of the resource to delete
 *        required: true
 *        type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: If exists, the resource will be returned
 */
router.get('/users/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    if (Number(id) !== Number(req.user.id)) {
      throw Error('User not allowed to view for this resource');
    }
    logger.info(`Attempting to fetch user id: ${req.user.id}`);
    const dbUser = await db.User.findOne({ where: { id }, attributes: ['id', 'email', 'userName'] });
    delete dbUser.password;
    res.send(dbUser);
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.send({ message: error.message, errors: error.errors }, 400);
  }
});

module.exports = router;

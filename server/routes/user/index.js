const express = require('express');

const { createToken } = require('../../services/user/jwt');
const db = require('../../database/models');
const auth = require('../../services/user/auth');
const logger = require('../../services/logger');
const { emailValidator, passwordValidator, verifyPassword } = require('../../services/user/validations');

const router = express.Router();

/**
 * @swagger
 * /user:
 *   post:
 *     tags: ['User']
 *     description: Register an user
 *     parameters:
 *      - name: body
 *        in: body
 *        description: payload
 *        required: true
 *        type: object
 *        schema:
 *          properties:
 *            userName:
 *              required: true
 *              description: Username of the user
 *              type: string
 *            password:
 *              required: true
 *              description: Non-restrictions password for the user
 *              type: string
 *            email:
 *              required: true
 *              description: unique user email
 *              type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: user created
 */
router.post('/user', async (req, res) => {
  const { email, password, userName } = req.body;
  try {
    emailValidator(email);
    passwordValidator(password);
    if (!userName) throw Error('userName is required');

    logger.info('Attempting to create user');
    const userInstance = await db.User.create({
      email,
      password,
      userName,
    });
    res.send(userInstance, 201);
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.send({ message: error.message, errors: error.errors }, 400);
  }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: ["User"]
 *     description: Login
 *     parameters:
 *      - name: email
 *        in: query
 *        required: true
 *        type: string
 *      - name: password
 *        in: query
 *        required: true
 *        type: string
 *     produces:
 *       - string
 *     responses:
 *       200:
 *         description: user created
 */
router.post('/user/login', async (req, res) => {
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
 * /user/{userId}:
 *   patch:
 *     tags: ["User"]
 *     description: Update an user
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: id of the resource to modify
 *        required: true
 *        type: integer
 *      - name: body
 *        in: body
 *        description: payload
 *        required: true
 *        type: object
 *        schema:
 *          properties:
 *            userName:
 *              required: true
 *              description: Username of the user
 *              type: string
 *            password:
 *              required: true
 *              description: Non-restrictions password for the user
 *              type: string
 *            email:
 *              required: true
 *              description: unique user email
 *              type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *          properties:
 *           name:
 *             type: string
 *           username:
 *             type: string
 *           email:
 *             type: string
 */
router.patch('/user/:id', async (req, res) => {
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
 * /user/{userId}:
 *   delete:
 *     tags: ["User"]
 *     description: Delete an user
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
 *         schema:
 *          properties:
 *           name:
 *             type: string
 *           username:
 *             type: string
 *           email:
 *             type: string
 */
router.delete('/user/:id', async (req, res) => {
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
  logger.info(`user: ${req.user}`);
  res.send('You visited POST user/:id/folder/:id/note');
});

module.exports = router;

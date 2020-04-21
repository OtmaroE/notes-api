const express = require('express');
const createError = require('http-errors');

const { createToken } = require('../../services/user/jwt');
const auth = require('../../services/user/auth');
const logger = require('../../services/logger');
const { emailValidator, passwordValidator } = require('../../services/user/validations');

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
 *            name:
 *              required: false
 *              description: Full name of the user
 *              type: string
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
router.post('/user', (req, res) => {
  const { email, password, userName } = req.body;
  try {
    emailValidator(email);
    passwordValidator(password);
  } catch (error) {
    res.send(createError(error.message, 400));
  }
  logger.info('Attempting to create user');
});

/**
 * @swagger
 * /user/login:
 *   get:
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
router.get('/user/login', (req, res) => {
  const debugUserData = {
    user: 'debug@debug.com',
    role: 'admin',
    permissions: 'debug',
  };
  const token = createToken(debugUserData);
  res.send(token);
});

/**
 * @swagger
 * /user/:userId:
 *   get:
 *     tags: ["User"]
 *     description: Get profile information
 *     parameters:
 *      - name: userId
 *        in: path
 *        required: true
 *        type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: user resource
 *         schema:
 *           properties:
 *            name:
 *              type: string
 *            username:
 *              type: string
 *            email:
 *              type: string
 */
router.get('/user/:id', (req, res) => {
  logger.info('Accessing "GET user/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited POST user/:id/folder/:id/note');
});

/**
 * @swagger
 * /user/:userId:
 *   patch:
 *     tags: ["User"]
 *     description: Update an user
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
router.patch('/user/:id', (req, res) => {
  logger.info('Accessing "POST user/:id/folder/:id/note"');
  logger.info(`user: ${req.user}`);
  res.send('You visited POST user/:id/folder/:id/note');
});

/**
 * @swagger
 * /user/:userId:
 *   delete:
 *     tags:
 *       - User
 *     description: Delete an user
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
router.delete('/user/:id', (req, res) => {
  logger.info('Accessing "POST user/:id/folder/:id/note"');
  logger.info(`user: ${req.user}`);
  res.send('You visited POST user/:id/folder/:id/note');
});

module.exports = router;

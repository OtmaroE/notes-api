const express = require('express');
const { createToken } = require('../../services/user/jwt');
const auth = require('../../services/user/auth');
const logger = require('../../services/logger');

const router = express.Router();

/**
 * @swagger
 * definitions:
 *  User:
 *    properties:
 *      name:
 *        type: string
 *      userName:
 *        type: string
 *      email:
 *        type: string
 */

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - User
 *     description: Register an user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: user created
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/user', (_, res) => res.send('You tried to sing-up'));

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - User
 *     description: Register an user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: user created
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/user/login/debug', (req, res) => {
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
 * /user:
 *   post:
 *     tags:
 *       - User
 *     description: Login
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: token
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/login', auth, (req, res) => {
  logger.info('Accessing "POST /login"');
  logger.info(`user: ${req.user}`);
  res.send('You visited POST /login');
});

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - User
 *     description: Get profile information
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: user resource
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/user/:id', (req, res) => {
  logger.info('Accessing "GET user/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited POST user/:id/folder/:id/note');
});

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - User
 *     description: Update an user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: user resource
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.put('/user/:id', (req, res) => {
  logger.info('Accessing "POST user/:id/folder/:id/note"');
  logger.info(`user: ${req.user}`);
  res.send('You visited POST user/:id/folder/:id/note');
});

/**
 * @swagger
 * /user:
 *   patch:
 *     tags:
 *       - User
 *     description: Update an user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: user resource
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.patch('/user/:id', (req, res) => {
  logger.info('Accessing "POST user/:id/folder/:id/note"');
  logger.info(`user: ${req.user}`);
  res.send('You visited POST user/:id/folder/:id/note');
});

/**
 * @swagger
 * /user:
 *   delete:
 *     tags:
 *       - User
 *     description: Delete an user
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.delete('/user/:id', (req, res) => {
  logger.info('Accessing "POST user/:id/folder/:id/note"');
  logger.info(`user: ${req.user}`);
  res.send('You visited POST user/:id/folder/:id/note');
});

module.exports = router;

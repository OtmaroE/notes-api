const express = require('express');
const logger = require('../../services/logger');
const auth = require('../../services/user/auth');

const router = express.Router();

/**
 * @swagger
 * definitions:
 *  Note:
 *    properties:
 *      name:
 *        type: string
 *      content:
 *        type: string
 *      color:
 *        type: string
 *      folderId:
 *        type: integer
 */

/**
 * @swagger
 * /users/:id/folders/:id/notes:
 *   post:
 *     tags:
 *       - Note
 *     description: Create a note for a user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: note resource created
 *         schema:
 *           $ref: '#/definitions/Note'
 */
router.post('users/:id/folders/:id/note', auth, (req, res) => {
  logger.info('Accessing "POST users/:id/folders/:id/notes"');
  logger.info(`user: ${req.user}`);
  res.send('You visited POST users/:id/folders/:id/notes');
});

/**
 * @swagger
 * /users/:id/folders/:id/notes/:id:
 *   get:
 *     tags:
 *       - Note
 *     description: Get a note for a user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: note resource
 *         schema:
 *           $ref: '#/definitions/Note'
 */
router.get('users/:id/folders/:id/notes/:id', auth, (req, res) => {
  logger.info('Accessing "GET users/:id/folders/:id/notes/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited GET users/:id/folders/:id/notes/:id');
});

/**
 * @swagger
 * /users/:id/folders/:id/notes/:id:
 *   put:
 *     tags:
 *       - Note
 *     description: Update a note for a user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: note resource
 *         schema:
 *           $ref: '#/definitions/Note'
 */
router.put('users/:id/folders/:id/notes/:id', auth, (req, res) => {
  logger.info('Accessing "PUT user/:id/folder/:id/note/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited PUT user/:id/folder/:id/note/:id');
});

/**
 * @swagger
 * /users/:id/folders/:id/notes/:id:
 *   put:
 *     tags:
 *       - Note
 *     description: Update a note for a user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: note resource
 *         schema:
 *           $ref: '#/definitions/Note'
 */
router.patch('users/:id/folders/:id/notes/:id', auth, (req, res) => {
  logger.info('Accessing "PATCH users/:id/folders/:id/notes/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited PATCH users/:id/foldesr/:id/notes/:id');
});

/**
 * @swagger
 * /users/:id/folders/:id/notes/:id:
 *   del:
 *     tags:
 *       - Note
 *     description: Delete a note for a user
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         schema:
 *           $ref: '#/definitions/Note'
 */
router.delete('users/:id/folders/:id/notes/:id', auth, (req, res) => {
  logger.info('Accessing "DELETE users/:id/folders/:id/notes/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited DELETE users/:id/folders/:id/notes/:id');
});

module.exports = router;

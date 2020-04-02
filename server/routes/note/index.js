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
 * /user/:id/folder/:id/note:
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
router.post('user/:id/folder/:id/note', auth, (req, res) => {
  logger.info('Accessing "POST user/:id/folder/:id/note"');
  logger.info(`user: ${req.user}`);
  res.send('You visited POST user/:id/folder/:id/note');
});

/**
 * @swagger
 * /user/:id/folder/:id/note/:id:
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
router.get('user/:id/folder/:id/note/:id', auth, (req, res) => {
  logger.info('Accessing "GET user/:id/folder/:id/note/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited GET user/:id/folder/:id/note/:id');
});

/**
 * @swagger
 * /user/:id/folder/:id/note/:id:
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
router.put('user/:id/folder/:id/note/:id', auth, (req, res) => {
  logger.info('Accessing "PUT user/:id/folder/:id/note/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited PUT user/:id/folder/:id/note/:id');
});

/**
 * @swagger
 * /user/:id/folder/:id/note/:id:
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
router.patch('user/:id/folder/:id/note/:id', auth, (req, res) => {
  logger.info('Accessing "PATCH user/:id/folder/:id/note/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited PATCH user/:id/folder/:id/note/:id');
});

/**
 * @swagger
 * /user/:id/folder/:id/note/:id:
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
router.delete('user/:id/folder/:id/note/:id', auth, (req, res) => {
  logger.info('Accessing "DELETE user/:id/folder/:id/note/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited DELETE user/:id/folder/:id/note/:id');
});

module.exports = router;

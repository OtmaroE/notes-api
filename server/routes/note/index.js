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
 *  Note-INPUT:
 *    properties:
 *      name:
 *        type: string
 *      content:
 *        type: string
 *      color:
 *        type: string
 */

/**
 * @swagger
 * /users/{userId}/folders/{folderId}/notes:
 *   post:
 *     tags: ['Note']
 *     description: Create a note for a user
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: id of the user
 *        required: true
 *        type: integer
 *      - name: folderId
 *        in: path
 *        description: id of the folder
 *        required: true
 *        type: integer
 *     requestBody:
 *      description: Note record on JSON format
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Note-INPUT'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Note resource created
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Note'
 */
router.post('users/:id/folders/:id/note', auth, (req, res) => {
  logger.info('Accessing "POST users/:id/folders/:id/notes"');
  logger.info(`user: ${req.user}`);
  res.send('You visited POST users/:id/folders/:id/notes');
});

/**
 * @swagger
 * /users/{userId}/folders/{folderId}/notes/{noteId}:
 *   get:
 *     tags: ['Note']
 *     description: Get a note for a user
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: id of the user
 *        required: true
 *        type: integer
 *      - name: folderId
 *        in: path
 *        description: id of the folder
 *        type: integer
 *      - name: noteId
 *        in: path
 *        description: if of the note
 *        type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Note resource
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Note'
 */
router.get('users/:id/folders/:id/notes/:id', auth, (req, res) => {
  logger.info('Accessing "GET users/:id/folders/:id/notes/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited GET users/:id/folders/:id/notes/:id');
});

/**
 * @swagger
 * /users/{userId}/folders/{folderId}/notes/{noteId}:
 *   put:
 *     tags: ['Note']
 *     description: Update a note for a user
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: id of the user
 *        required: true
 *        type: integer
 *      - name: folderId
 *        in: path
 *        description: id of the folder
 *        required: true
 *        type: integer
 *      - name: noteId
 *        in: path
 *        description: id of the note
 *        required: true
 *        type: integer
 *     requestBody:
 *      description: Note record on JSON format to update
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Note-INPUT'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Note resource
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Note'
 */
router.put('users/:id/folders/:id/notes/:id', auth, (req, res) => {
  logger.info('Accessing "PUT user/:id/folder/:id/note/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited PUT user/:id/folder/:id/note/:id');
});

/**
 * @swagger
 * /users/{userId}/folders/{folderId}/notes/{noteId}:
 *   patch:
 *     tags: ['Note']
 *     description: Update a note for a user
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: id of the user
 *        required: true
 *        type: integer
 *      - name: folderId
 *        in: path
 *        description: id of the folder
 *        required: true
 *        type: integer
 *     requestBody:
 *      description: Note record on JSON format
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Note-INPUT'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Note resource updated
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Note'
 */
router.patch('users/:id/folders/:id/notes/:id', auth, (req, res) => {
  logger.info('Accessing "PATCH users/:id/folders/:id/notes/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited PATCH users/:id/foldesr/:id/notes/:id');
});

/**
 * @swagger
 * /users/{userId}/folders/{folderId}/notes/{noteId}:
 *   delete:
 *     tags: ['Note']
 *     description: Delete a note for a user
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: id of the user
 *        required: true
 *        type: integer
 *      - name: folderId
 *        in: path
 *        description: id of the folder
 *        required: true
 *        type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *        description: If note exists, note will be deleted
 */
router.delete('users/:id/folders/:id/notes/:id', auth, (req, res) => {
  logger.info('Accessing "DELETE users/:id/folders/:id/notes/:id"');
  logger.info(`user: ${req.user}`);
  res.send('You visited DELETE users/:id/folders/:id/notes/:id');
});

module.exports = router;

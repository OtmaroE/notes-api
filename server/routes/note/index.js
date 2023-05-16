const express = require('express');
const db = require('../../database/models');
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
 * /users/me/folders/{folderId}/notes:
 *   post:
 *     tags: ['Note']
 *     description: Create a note for a user
 *     security:
 *      - BearerAuth: []
 *     parameters:
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
router.post('/users/me/folders/:id/note', auth, async (req, res) => {
  const { params: { folderId }, user: { id: userId } = {}, body } = req;
  try {
    const folder = await db.Folder.findByPk(folderId);
    if (!folder || (folder.userId !== userId)) {
      throw Error('Folder provided does not exist for user');
    }
    const note = await db.Note.create({
      name: body.name,
      content: body.content,
      folderId: folder.id,
      userId,
      isDeleted: false,
    });
    res.send(note, 201);
  } catch (error) {
    logger.error(error);
    res.send({ message: `Failure to add note: ${error.message}` }, 400);
  }
  logger.info(`user: ${req.user}`);
  res.send('You visited POST users/:id/folders/:id/notes');
});
/**
 * @swagger
 * /users/me/folders/{folderId}/notes:
 *  get:
 *    tags: ['Note']
 *    description: Lists all notes of a given folder
 *    security:
 *     - BearerAuth: []
 *    parameters:
 *     - name: folderId
 *       in: path
 *       description: id of the folder
 *       required: true
 *       type: integer
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Notes
 *        content:
 *         application/json:
 *           schema:
 *            $ref: '#/definitions/Note'
 */
router.get('/users/me/folders/:id/notes/', auth, async (req, res) => {
  const { user: { id: folderId } = {} } = req;
  try {
    const notes = await db.Note.findAll({ where: { folderId } });
    res.send(notes, 200);
  } catch (error) {
    logger.error(error);
    res.send([]);
  }
});

/**
 * @swagger
 * /users/me/folders/{folderId}/notes/{noteId}:
 *   get:
 *     tags: ['Note']
 *     description: Get a note for a user
 *     security:
 *      - BearerAuth: []
 *     parameters:
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
router.get('/users/me/folders/:id/notes/:id', auth, async (req, res) => {
  const { user: { id: userId } = {} } = req;
  try {
    const notes = await db.Note.findAll({ where: { userId, isDeleted: false } });
    res.send(notes, 200);
  } catch (error) {
    logger.error(error);
    res.send([]);
  }
  logger.info(`user: ${req.user}`);
  res.send('You visited GET users/:id/folders/:id/notes/:id');
});

/**
 * @swagger
 * /users/me/folders/{folderId}/notes/{noteId}:
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
router.patch('/users/me/folders/:folderId/notes/:noteId', auth, async (req, res) => {
  const { params: { folderId }, user: { id: userId } = {}, body = {} } = req;
  try {
    const note = await db.Note.findByPk(folderId);
    if (note.userId !== userId) {
      throw Error('User is not the owner of the note');
    }
    if (note.foldeId !== folderId) {
      throw Error('Note does not belong to provided folder');
    }
    const updatedNote = await note.update({
      name: body.name ? body.name : note.name,
      content: body.content ? body.content : note.content,
    });
    res.send(updatedNote, 201);
  } catch (error) {
    logger.error(error);
    res.send({ message: `Failure to add note: ${error.message}` }, 400);
  }
});

/**
 * @swagger
 * /users/me/folders/{folderId}/notes/{noteId}:
 *   delete:
 *     tags: ['Note']
 *     description: Delete a note for a user
 *     security:
 *      - BearerAuth: []
 *     parameters:
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
router.delete('/users/me/folders/:folderId/notes/:noteId', auth, async (req, res) => {
  const { params: { folderId }, user: { id: userId } = {} } = req;
  try {
    const note = await db.Note.findByPk(folderId);
    if (note.userId !== userId) {
      throw Error('User is not the owner of the note');
    }
    if (note.foldeId !== folderId) {
      throw Error('Note does not belong to provided folder');
    }
    await note.update({ isDeleted: true });
    res.send(204);
  } catch (error) {
    logger.error(error);
    res.send(204);
  }
});

module.exports = router;

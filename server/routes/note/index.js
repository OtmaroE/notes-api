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
router.post('/users/me/folders/:folderId/notes', auth, async (req, res) => {
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
    res.status(201).send(note);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ message: `Failure to add note: ${error.message}` });
  }
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
 *        description: Note
 *        content:
 *         application/json:
 *           schema:
 *            $ref: '#/definitions/Note'
 */
router.get('/users/me/folders/:id/notes', auth, async (req, res) => {
  const { params: { id: folderId } = {} } = req;
  try {
    const notes = await db.Note.findAll({ where: { folderId, isDeleted: false } });
    res.status(200).send(notes);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ message: `Failure to retrieve note: ${error.message}` });
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
router.get('/users/me/folders/:folderId/notes/:noteId', auth, async (req, res) => {
  const { params: { folderId, noteId }, user: { id: userId } = {} } = req;
  try {
    const folder = await db.Folder.findByPk(folderId);
    if (!folder || folder.userId !== userId) {
      throw Error('User is not the owner of the note');
    }
    const note = await db.Note.findByPk(noteId);
    console.log(note.folderId);
    console.log(folderId);
    console.log(note.folderId !== folder.id);
    if (note.isDeleted || note.folderId !== folder.id) {
      throw Error('Note is not in the system');
    }
    res.status(200).send(note);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ message: `Failure to read note: ${error.message}` });
  }
});

/**
 * @swagger
 * /users/me/folders/{folderId}/notes/{noteId}:
 *   patch:
 *     tags: ['Note']
 *     description: Update a note for a user
 *     security:
 *      - BearerAuth: []
 *     parameters:
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
  const { params: { folderId, noteId }, user: { id: userId } = {}, body = {} } = req;
  try {
    const folder = await db.Folder.findByPk(folderId);
    if (!folder || folder.userId !== userId) {
      throw Error('User is not the owner of the note');
    }
    const note = await db.Note.findByPk(noteId);
    if (note.isDeleted || note.folderId !== folder.id) {
      throw Error('Note is not in the system');
    }
    const updatedNote = await note.update({
      name: body.name ? body.name : note.name,
      content: body.content ? body.content : note.content,
    });
    res.status(201).send(updatedNote);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ message: `Failure to add note: ${error.message}` });
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
 *      - name: noteId
 *        in: path
 *        description: id of the note
 *        required: true
 *        type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *        description: If note exists, note will be deleted
 */
router.delete('/users/me/folders/:folderId/notes/:noteId', auth, async (req, res) => {
  const { params: { folderId, noteId }, user: { id: userId } = {} } = req;
  try {
    const folder = await db.Folder.findByPk(folderId);
    if (!folder || folder.userId !== userId) {
      throw Error('User is not the owner of the note');
    }
    const note = await db.Note.findByPk(noteId);
    const updatedNote = await note.update({ isDeleted: true });
    res.status(204).send(updatedNote);
  } catch (error) {
    logger.error(error);
    res.send(204);
  }
});

module.exports = router;

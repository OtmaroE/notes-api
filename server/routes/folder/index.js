const express = require('express');
const db = require('../../database/models');
const logger = require('../../services/logger');
const auth = require('../../services/user/auth');

const router = express.Router();

/**
 * @swagger
 * definitions:
 *  Folder:
 *    properties:
 *      name:
 *        type: string
 *      userId:
 *        type: number
 *      isDeleted:
 *        type: boolean
 *  FolderPUT:
 *    properties:
 *      name:
 *        type: string
 */

/**
 * @swagger
 * /users/me/folders:
 *   post:
 *     tags: ['Folder']
 *     description: Create a folder for a user
 *     security:
 *      - BearerAuth: []
 *     requestBody:
 *       description: Folder record on JSON format
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            properties:
 *              name:
 *                required: ['true']
 *                description: Name of the folder
 *                type: string
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Folder resource created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Folder'
 *       400:
 *         description: Error creating folder
 */
router.post('/users/me/folders', auth, async (req, res) => {
  const { user: { id } = {}, body: { name } } = req;
  try {
    if (!name) throw Error('name parameter must be provided');

    const user = await db.User.findByPk(id);
    if (!user) throw Error('User does not exists');

    const folderInstance = await db.Folder.create({
      name,
      userId: user.id,
      isDeleted: false,
    });
    res.status(201).send(folderInstance);
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.status(400).send({ message: error.message, errors: error.errors });
  }
});

/**
 * @swagger
 * /users/me/folders:
 *  get:
 *    tags: ['Folder']
 *    description: Return all the available folders for a user
 *    security:
 *      - BearerAuth: []
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Folder resources available
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/definitions/Folder'
 */
router.get('/users/me/folders', auth, async (req, res) => {
  const { user: { id: userId } = {} } = req;
  try {
    const folders = await db.Folder.findAll({ where: { userId, isDeleted: false } });
    res.status(200).send(folders);
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.status(400).send({ message: error.message, errors: error.errors });
  }
});

/**
 * @swagger
 * /users/me/folders/{folderId}:
 *   patch:
 *     tags: ['Folder']
 *     description: Update a folder's name
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: folderId
 *         in: path
 *         description: id of the folder
 *         required: true
 *         type: integer
 *     requestBody:
 *         description: folder payload
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/FolderPUT'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Entity updated successfully
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Folder'
 *       404:
 *         description: Resource not found
 *       400:
 *         description: Malformatted input
 */
router.patch('/users/me/folders/:folderId', auth, async (req, res) => {
  const { params: { folderId }, user: { id: userId } = {}, body: { name } } = req;
  try {
    const folder = await db.Folder.findByPk(folderId);
    if (!folder) throw Error('Resource does not exists');

    // TODO: admins will eventually have power over other's resources
    if (folder.userId !== userId) {
      throw Error('User not allowed to modify for this resource');
    }
    const updatedFolder = await folder.update({ name });
    res.status(200).send(updatedFolder);
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.status(400).send({ message: error.message, errors: error.errors });
  }
});

/**
 * @swagger
 * /users/me/folders/{folderId}:
 *  delete:
 *    tags: ['Folder']
 *    description: Deletes a folder
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - name: folderId
 *        in: path
 *        description: id of the folder
 *        required: true
 *        type: integer
 *    produces:
 *      - application/json
 *    responses:
 *      204:
 *        description: If exists, the resource will be deleted
 */
router.delete('/users/:userId/folders/:folderId', auth, async (req, res) => {
  const { user: { id: userId } = {}, params: { folderId } } = req;
  try {
    const folder = await db.Folder.findByPk(folderId);
    if (!folder) throw Error('Resource does not exits');

    if (folder.userId !== userId) {
      throw Error('User not allowed to modify for this resource');
    }

    await folder.update({ isDeleted: true });
    res.send(204);
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.status(400).send({ message: error.message, errors: error.errors });
  }
});

module.exports = router;

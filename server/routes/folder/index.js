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
 *  Folder-PUT:
 *    properties:
 *      name:
 *        type: string
 *      isDeleted:
 *        type: boolean
 */

/**
 * @swagger
 * /users/{userId}/folders:
 *   post:
 *     tags: ['Folder']
 *     description: Create a folder for a user
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: id of the user
 *        required: true
 *        type: integer
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
router.post('/users/:id/folders', auth, async (req, res) => {
  const { params: { id }, body: { name } } = req;
  try {
    if (!name) throw Error('name parameter must be provided');

    const user = await db.User.findByPk(id);
    if (!user) throw Error('User does not exists');

    const folderInstance = await db.Folder.create({
      name,
      userId: user.id,
      isDeleted: false,
    });
    res.send(folderInstance, 201);
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.send({ message: error.message, errors: error.errors }, 400);
  }
});

/**
 * @swagger
 * /users/{userId}/folders:
 *  get:
 *    tags: ['Folder']
 *    description: Return all the available folders for a user
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - name: userId
 *        in: path
 *        description: id of the user
 *        required: true
 *        type: integer
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
router.get('/users/:userId/folders', auth, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await db.User.findByPk(userId);
    if (!user) throw Error('User does not exists');

    if (user.id !== req.user.id) throw Error('User not allowed to ask for this resource');
    const folders = await db.Folder.findAll({ where: { userId, isDeleted: false } });
    res.send(folders, 200);
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.send({ message: error.message, errors: error.errors }, 400);
  }
});

/**
 * @swagger
 * /users/{userId}/folders/{folderId}:
 *   patch:
 *     tags: ['Folder']
 *     description: Update a folder's name
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: id of the user
 *         required: true
 *         type: integer
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
 *               $ref: '#/definitions/Folder-PUT'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Entity updated successfully
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Folder-PUT'
 *       404:
 *         description: Resource not found
 *       400:
 *         description: Malformatted input
 */
router.patch('/users/:userId/folders/:folderId', auth, async (req, res) => {
  const { params: { userId, folderId }, body: { name } } = req;
  try {
    const folder = await db.Folder.findByPk(folderId);
    if (!folder) throw Error('Resource does not exists');

    // TODO: admins will eventually have power over other's resources
    if (folder.userId !== req.user.id || folder.userId !== Number(userId)) {
      throw Error('User not allowed to modify for this resource');
    }
    await folder.update({ name });
    res.send(204);
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.send({ message: error.message, errors: error.errors }, 400);
  }
});

/**
 * @swagger
 * /users/{userId}/folders/{folderId}:
 *  delete:
 *    tags: ['Folder']
 *    description: Deletes a folder
 *    security:
 *      - BearerAuth: []
 *    parameters:
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
 *    produces:
 *      - application/json
 *    responses:
 *      204:
 *        description: If exists, the resource will be deleted
 */
router.delete('/users/:userId/folders/:folderId', auth, async (req, res) => {
  const { userId, folderId } = req.params;
  try {
    const folder = await db.Folder.findByPk(folderId);
    if (!folder) throw Error('Resource does not exits');

    if (folder.userId !== req.user.id || folder.userId !== Number(userId)) {
      throw Error('User not allowed to modify for this resource');
    }

    await folder.update({ isDeleted: true });
    res.send(204);
  } catch (error) {
    logger.error({ message: error.message, errors: error.errors });
    res.send({ message: error.message, errors: error.errors }, 400);
  }
});

module.exports = router;

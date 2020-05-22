const express = require('express');
const db = require('../../database/models');
const logger = require('../../services/logger');
const auth = require('../../services/user/auth');

const router = express.Router();

/**
 * @swagger
 * /user/{userId}/folder:
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
 *       description: folder record on JSON format
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
 *         description: folder resource created
 */
router.post('/user/:id/folder', auth, async (req, res) => {
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

module.exports = router;

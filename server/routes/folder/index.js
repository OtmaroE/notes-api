const express = require('express');
const logger = require('../../services/logger');
const auth = require('../../services/user/auth');

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   Folder:
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       color:
 *         type: integer
 */

/**
 * @swagger
 * /user/:id/folder:
 *   post:
 *     tags:
 *       - Folder
 *     description: Create a folder for a user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/Folder'
 */
router.post('user/:id/folder', auth, (req, res) => {
  logger.info('Accessing "POST user/:id/folder"');
  logger.info(`user: ${req.user}`);
  res.send('You visited POST user/:id/folder');
});

module.exports = router;

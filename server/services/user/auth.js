const { verifyToken } = require('./jwt');
const logger = require('../logger');
/**
 * Validate the user token credentials.
 * If allowed call next, populating req object with user information.
 * If not allowed return 401
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 * @param {Function} next callback function
 */
function auth(req, res, next) {
  const { headers: { authorization } = {} } = req;
  if (!authorization) {
    logger.debug('No authorization header provided, returning 400');
    return res.status(401).send('Unauthorized');
  }
  const verifiedToken = verifyToken(authorization);
  if (!verifiedToken) {
    logger.debug('Bad token format, returning 401');
    return res.status(401).send('Unauthorized');
  }
  logger.info(`User token generated for user: ${verifiedToken.userData.id}`);
  req.user = verifiedToken.userData;
  next();
  return null;
}

module.exports = auth;

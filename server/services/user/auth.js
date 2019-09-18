const { verifyToken } = require('./jwt');
/**
 * Validate the user token credentials.
 * If allowed call next, populating req object with user information.
 * If not allowed return 401
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 * @param {Object} next callback function
 */
function auth(req, res, next) {
  const { headers: { authorization } = {} } = req;
  if (!authorization) {
    return res.status(400).send('Bad Request');
  }
  const verifiedToken = verifyToken(authorization);
  if (!verifiedToken) {
    return res.status(401).send('Unauthorized');
  }
  console.log(verifiedToken);
  req.user = verifiedToken;
  next(req, res);
  return null;
}

module.exports = auth;

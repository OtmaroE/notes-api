const jwt = require('jsonwebtoken');
const logger = require('../logger');

const secret = process.env.SECRET || 'secret';

/**
 * Returns codified token
 * @param {Object} userData data to be encoded on jwt
 */
function createToken(userData) {
  const token = jwt.sign({ userData }, secret, { algorithm: 'HS384' });
  return token;
}
/**
 * Return the decoded token or null
 * @param {String} token JWT data to be verified
 */
function verifyToken(token) {
  if (!token) return null;
  let filteredToken = token;
  if (token.startsWith('Bearer') || token.startsWith('bearer')) {
    [, filteredToken] = token.split(' ');
  }
  const decodedToken = jwt.verify(filteredToken, secret, (err, decoded) => {
    if (err) {
      logger.error(`token decoding failed: ${err}`);
      return null;
    }
    logger.debug('token successfully created');
    return decoded;
  });
  return decodedToken;
}

module.exports = {
  createToken,
  verifyToken,
};

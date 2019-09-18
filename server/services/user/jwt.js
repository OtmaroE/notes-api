const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'secret';

/**
 * Returns codified token
 * @param {Object} userData data to be encoded on jwt
 */
function createToken(userData) {
  const token = jwt.sign(userData, secret, { algorithm: 'HS384' });
  return token;
}
/**
 * Return the decoded token or null
 * @param {String} token JWT data to be verified
 */
function verifyToken(token) {
  if (!token) return null;
  const decodedToken = jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return null;
    }
    console.log(decoded);
    return decoded;
  });
  return decodedToken;
}

module.exports = {
  createToken,
  verifyToken,
};

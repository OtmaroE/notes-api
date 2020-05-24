const bcryptjs = require('bcryptjs');

/**
 * Encrypts password, hashed value to store on db
 * @param password plain text password
 * @returns encrypted password
 */
function encryptPassword(password) {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
}

module.exports = {
  encryptPassword,
};

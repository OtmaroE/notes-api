/**
 * Basic Email validator
 * @param {String} email represent the email
 * Throws an error or returns nothing
 */
const emailValidator = (email) => {
  if (!email) throw Error('email must be provided');
  const emailRegex = /\S+@\S+\.\S+/;
  const validEmailByRegex = emailRegex.test(email);
  if (!validEmailByRegex) throw Error('Email is not from a valid format');
};

/**
 * Basic password validator
 * @param {String} password represent the email
 * Throws an error or returns nothing
 */
const passwordValidator = (password) => {
  if (!password) throw Error('password must be provided');
  if (!password.length > 7) throw Error('password length must be at least 7 characters');
};

const verifyPassword = (password, hashedPassword) => {
  if (password !== hashedPassword) throw Error('password is wrong');
}

module.exports = {
  emailValidator,
  passwordValidator,
  verifyPassword,
};

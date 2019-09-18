const homeRoutes = require('./home');
const userRoutes = require('./user');
const noteRoutes = require('./note');
const folderRoutes = require('./folder');

module.exports = (app) => {
  homeRoutes(app);
  userRoutes(app);
  noteRoutes(app);
  folderRoutes(app);
};

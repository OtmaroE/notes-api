const logger = require('../../services/logger');
const auth = require('../../services/user/auth');

module.exports = (app) => {
  app.post('user/:id/folder/:id/note', auth, (req, res) => {
    logger.info('Accessing "POST user/:id/folder/:id/note"');
    logger.info(`user: ${req.user}`);
    res.send('You visited POST user/:id/folder/:id/note');
  });
  app.get('user/:id/folder/:id/note/:id', auth, (req, res) => {
    logger.info('Accessing "GET user/:id/folder/:id/note/:id"');
    logger.info(`user: ${req.user}`);
    res.send('You visited GET user/:id/folder/:id/note/:id');
  });
  app.put('user/:id/folder/:id/note/:id', auth, (req, res) => {
    logger.info('Accessing "PUT user/:id/folder/:id/note/:id"');
    logger.info(`user: ${req.user}`);
    res.send('You visited PUT user/:id/folder/:id/note/:id');
  });
  app.patch('user/:id/folder/:id/note/:id', auth, (req, res) => {
    logger.info('Accessing "PATCH user/:id/folder/:id/note/:id"');
    logger.info(`user: ${req.user}`);
    res.send('You visited PATCH user/:id/folder/:id/note/:id');
  });
  app.delete('user/:id/folder/:id/note/:id', auth, (req, res) => {
    logger.info('Accessing "DELETE user/:id/folder/:id/note/:id"');
    logger.info(`user: ${req.user}`);
    res.send('You visited DELETE user/:id/folder/:id/note/:id');
  });
};

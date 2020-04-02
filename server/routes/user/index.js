const { createToken } = require('../../services/user/jwt');
const auth = require('../../services/user/auth');
const logger = require('../../services/logger');

module.exports = (app) => {
  app.post('/user', (req, res) =>  {
    return res.send('You tried to sing-up');
  });

  app.get('/user/login/debug', (req, res) => {
    const debugUserData = {
      user: 'debug@debug.com',
      role: 'admin',
      permissions: 'debug',
    };
    const token = createToken(debugUserData);
    res.send(token);
  });

  app.post('/login', auth, (req, res) => {
    logger.info('Accessing "POST /login"');
    logger.info(`user: ${req.user}`);
    res.send('You visited POST /login');
  });
  app.get('/user/:id', (req, res) => {
    logger.info('Accessing "GET user/:id"');
    logger.info(`user: ${req.user}`);
    res.send('You visited POST user/:id/folder/:id/note');
  });
  app.put('/user/:id', (req, res) => {
    logger.info('Accessing "POST user/:id/folder/:id/note"');
    logger.info(`user: ${req.user}`);
    res.send('You visited POST user/:id/folder/:id/note');
  });
  app.patch('/user/:id', (req, res) => {
    logger.info('Accessing "POST user/:id/folder/:id/note"');
    logger.info(`user: ${req.user}`);
    res.send('You visited POST user/:id/folder/:id/note');
  });
  app.delete('/user/:id', (req, res) => {
    logger.info('Accessing "POST user/:id/folder/:id/note"');
    logger.info(`user: ${req.user}`);
    res.send('You visited POST user/:id/folder/:id/note');
  });
  app.post('/signup/', (req, res) => {
    res.json(req.body);
  });
};

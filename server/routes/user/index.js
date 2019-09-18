const { createToken } = require('../../services/user/jwt');
const auth = require('../../services/user/auth');

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
    res.send(req.user);
  });
  app.get('/user/:id', (req, res) => {

  });
  app.put('/user/:id', (req, res) => {

  });
  app.patch('/user/:id', (req, res) => {

  });
  app.delete('/user/:id', (req, res) => {

  });
  app.post('/signup/', (req, res) => {
    res.json(req.body);
  });
};

const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');

const logger = require('./services/logger');
const routes = require('./routes/folder');

const app = express();

// TODO: Move swagger definition and endpoint out of index.js
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Notes API',
    version: '1.0.0',
    description: 'Simple note taking app',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/routes/folder/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const port = 3001;
app.use(express.json());
app.use('/', routes);
// require('./routes')(app);

app.listen(port, () => logger.info(`App listening on port ${port}`));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

module.exports = app;

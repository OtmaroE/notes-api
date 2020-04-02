const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');

const logger = require('../../services/logger');

const router = express.Router();

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
  apis: ['./server/routes/folder/*.js', './server/routes/note/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

router.get('/swagger.json', (req, res) => {
  logger.info('Swagger docs initialized');
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


module.exports = router;

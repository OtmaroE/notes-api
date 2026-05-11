const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');

const logger = require('../../services/logger');

const router = express.Router();
const PORT = process.env.SERVER_PORT || 3020;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Notes API',
    version: '1.0.0',
    description: 'Note taking API',
  },
  servers: [
    {
      url: process.env.SWAGGER_SERVER_URL || `http://localhost:${PORT}`,
    },
  ],
};

// options for the swagger docs
const options = {
  definition: swaggerDefinition,
  // path to the API docs
  apis: [
    './server/routes/folder/*.js',
    './server/routes/note/*.js',
    './server/routes/docs/components.yaml',
    './server/routes/user/*.js',
  ],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

router.get('/swagger.json', (req, res) => {
  logger.info(`Swagger docs initialized on: localhost:${PORT}`);
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

module.exports = router;

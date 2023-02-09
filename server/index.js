const express = require('express');
const swaggerUi = require('swagger-ui-express');


const logger = require('./services/logger');
const folderRoutes = require('./routes/folder');
const swaggerDocs = require('./routes/docs');
const noteRoutes = require('./routes/note');
const userRoutes = require('./routes/user');

const { SWAGGER_URL, PORT } = process.env;

const swaggerUiOptions = {
  swaggerOptions: {
    url: SWAGGER_URL,
  },
};

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerUiOptions));
app.use('/', folderRoutes);
app.use('/', swaggerDocs);
app.use('/', noteRoutes);
app.use('/', userRoutes);

app.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}`);
  logger.info(`Documentation can be found at: ${PORT}/api-docs`);
});

module.exports = app;

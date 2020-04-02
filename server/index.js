const express = require('express');
const swaggerUi = require('swagger-ui-express');


const logger = require('./services/logger');
const folderRoutes = require('./routes/folder');
const swaggerDocs = require('./routes/docs');
const noteRoutes = require('./routes/note');
const userRoutes = require('./routes/user');

const swaggerUiOptions = {
  swaggerOptions: {
    url: 'http://localhost:3001/swagger.json',
  },
};

const app = express();

const port = 3001;
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerUiOptions));
app.use('/', folderRoutes);
app.use('/', swaggerDocs);
app.use('/', noteRoutes);
app.use('/', userRoutes);

app.listen(port, () => logger.info(`App listening on port ${port}`));

module.exports = app;

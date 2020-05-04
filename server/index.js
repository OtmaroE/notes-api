const express = require('express');
const swaggerUi = require('swagger-ui-express');


const logger = require('./services/logger');
const folderRoutes = require('./routes/folder');
const swaggerDocs = require('./routes/docs');
const noteRoutes = require('./routes/note');
const userRoutes = require('./routes/user');

const PORT = process.env.SERVER_PORT || 3020;
const swaggerUiOptions = {
  swaggerOptions: {
    url: `http://localhost:${PORT}/swagger.json`,
  },
};

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerUiOptions));
app.use('/', folderRoutes);
app.use('/', swaggerDocs);
app.use('/', noteRoutes);
app.use('/', userRoutes);

app.listen(PORT, () => logger.info(`App listening on port ${PORT}`));

module.exports = app;

const express = require('express');

const logger = require('./services/logger');
const folderRoutes = require('./routes/folder');
const swaggerDocs = require('./routes/docs');

const app = express();

const port = 3001;
app.use(express.json());
app.use('/', folderRoutes);
app.use('/', swaggerDocs);
// require('./routes')(app);

app.listen(port, () => logger.info(`App listening on port ${port}`));

module.exports = app;

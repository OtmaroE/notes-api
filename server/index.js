const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());
require('./routes')(app);

app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = app;

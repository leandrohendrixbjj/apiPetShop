const express = require('express');
const app = express();
const config = require('./config/default.json');

require('./middleware/bodyParser.js')(app);
require('./middleware/serializar.js')(app);
require('./middleware/routes.js')(app);
require('./middleware/erros.js')(app);
require('./middleware/routesNotAvail.js')(app);

app.listen(config.api.port, () => {
  console.log(`Server is running at port ${config.api.port}`);
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/default.json');
const supplyRoute = require('./supply/route.js');
const NotFound = require('./Errors/NotFound.js');

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({extended:true}),    
);

app.use('/api/supply', supplyRoute);

app.use((error, req, res, next) => {
  let status = 400;

  if (error instanceof NotFound) {    
    status = 404;
  }
 
  res.status(status);
  res.json({mensagem:error.message,id:error.idError}); 
});

app.use('/', (req,res) => {
   res.send('Route not avail  ')  
});

app.listen(config.api.port, () => {
  console.log(`Server is running at port ${config.api.port}`);
});
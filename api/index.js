const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/default.json');
const supplyRoute = require('./supply/route.js');

app.use(
    bodyParser.json({
      extended:true
    }),
    bodyParser.urlencoded({
      extended:true  
    }),    
);

app.use('/api/supply', supplyRoute);
app.use('/', (req,res) => {
   res.send('Route not avail  ')  
})

app.listen(config.api.port, () => {
  console.log(`Server is running at port ${config.api.port}`);
});
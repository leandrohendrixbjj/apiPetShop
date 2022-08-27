const Serializer = require('../Serializar/index.js').acceptHeader;

module.exports = (app) => {
  app.use((req,res,next) => {
    let formatRequest = req.header('Accept');
          
    if (formatRequest ==  '*/*'){
      formatRequest = 'application/json';  
    }
    
    if (Serializer.indexOf(formatRequest) === -1){
      res.status(406).end();
      return;
    }
      
    res.setHeader('Content-Type', formatRequest);
      next();
    });
}
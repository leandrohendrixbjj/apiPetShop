const NotFound = require('../Errors/NotFound.js');
const NotAccetable = require('../Errors/NotAccetable.js');

module.exports = (app) => {
  app.use((error, req, res, next) => {
    let status = 400;
          
    if (error instanceof NotFound) {    
      status = 404;
    }

    if (error instanceof NotAccetable){
      status =  406;
    }
           
    res.status(status);
    res.json({mensagem:error.message,id:error.idError}); 
  });
}
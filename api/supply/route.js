const route = require('express').Router();
const Supply = require('./Supply.js');
const {body,validationResult} = require('express-validator');

route.get('/', async (req,res) => {
    res.json({'data': await Supply.all()});
});

route.post('/',[
    body('empresa').notEmpty().withMessage("Informe um valor para o campo empresa"),
    body('empresa').isLength({min:3}).withMessage("Informe três caracteres para empresa")

], async (req,res) => {
    const errors = validationResult(req);
    const errorsValidator = errors.array();
     
    if (errorsValidator.length > 0)
      res.status(400).json({"errors":errorsValidator});
    
    try{
      const supply = new Supply(req.body);  
      await supply.store();
      res.status(201).end();
    }catch(error){
      res.status(400);  
      throw new Error("Erro no cadastro da empresa");
    }
});

module.exports = route;
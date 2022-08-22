const route = require('express').Router();
const Supply = require('./Supply.js');
const {body,validationResult} = require('express-validator');
const SupplySerializer = require('../Serializar/index.js').SerializerError;

route.get('/', async (req,res,next) => { 
  try{
    const serializer = new SupplySerializer(req.header('Accept'));     
   
    res.status(200);
    let data = serializer.serialize(await Supply.all());
    res.send(
      await paginate(req.query.limit,req.query.page,JSON.parse(data))
    );
  
  }catch(error){
    next(error); 
  }          
});

async function paginate(limitParam,pageParam,companies){  
  return new Promise((resolve,reject) => {
    
    let limit = (limitParam == undefined || limitParam == 0) ? companies.length : parseInt(limitParam);
    let page = (pageParam == undefined || pageParam == 0) ? 1 : parseInt(pageParam);
       
    const startIndex = (page - 1 ) * limit;
    const endtIndex = page * limit;  
    const data = {};

    data.total = companies.length;
    if (startIndex > 0){
      data.previous = {
       page: page - 1,
       limit:limit
      }  
    }

    if (endtIndex < companies.length){
      data.next = {
        page: page + 1,
        limit:limit
      }
    }   
    data.result = companies.slice(startIndex,endtIndex);   
    resolve(data);
  });
}

route.post('/',[
    body('empresa').notEmpty().withMessage("Informe um valor para o campo empresa"),
    body('empresa').isLength({min:3}).withMessage("Informe três caracteres para empresa")

], async (req,res) => {
    const errors = validationResult(req);
    const errorsValidator = errors.array();
     
    if (errorsValidator.length > 0){
      res.status(400).json({"errors":errorsValidator});
    }else{    
      try{        
        const supply = new Supply(req.body);  
        await supply.store();
        res.status(201).end();
      }catch(error){
        res.status(400);        
      }
    }
});

route.get('/:id', async (req,res,next) => {
  const {id} = req.params;
  try{
    let serializer = new SupplySerializer(req.header('Accept'));
    let supply = new Supply({id:id});
    
    res.status(200);
    res.send(
      serializer.serialize(await supply.show())
    );    
  }catch(error){    
    next(error); 
  }  
});

route.put('/:id', [
   body('empresa').notEmpty().withMessage("Campos empresa é obrigatório"),
   body('empresa').isLength({min:3}).withMessage("Empresa deve ter três caracteres")  
], async (req,res,next) => {
   const errors = validationResult(req);
   const errorsValidator = errors.array();
   
   if (errorsValidator.length > 0){
     res.status(400).json({"errors":errorsValidator});
   }else{
    try{
      const dados = Object.assign({}, req.body, {id:req.params.id});
       const supply = new Supply(dados);
       await supply.update();
       res.status(204).end();
    }catch(error){
      next(error);    
    }   
   }
});

route.delete('/:id', async (req,res,next) => {
  
  try{
    const supply = new Supply({id:req.params.id});
    await supply.show();
    await supply.delete();
    res.status(204).end();
  }catch(error){
    next(error);   
  }
});

module.exports = route;
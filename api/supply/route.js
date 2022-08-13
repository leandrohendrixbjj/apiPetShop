const route = require('express').Router();
const Supply = require('./Supply.js');
const {body,validationResult} = require('express-validator');

route.get('/', async (req,res) => { 
  
  if (req.query.limit == undefined || req.query.page == undefined){
    res.status(200).json(await Supply.all());
  }else{
    const data = await paginate( parseInt(req.query.limit),
                                 parseInt(req.query.page),
                                await Supply.all());
    res.status(200).json(data);        
  } 
});

async function paginate(limit,page,companies){  
  return new Promise((resolve,reject) => {
    const startIndex = (page - 1 )*limit;
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
        throw new Error("Erro no cadastro da empresa");
      }
    }
});

route.get('/:id', async (req,res) => {
  const {id} = req.params;

  try{
     let supply = new Supply({id:id});
     res.status(200).json({data: await supply.show()});
  }catch(error){    
    throw new Error(error);
  }  
});

module.exports = route;
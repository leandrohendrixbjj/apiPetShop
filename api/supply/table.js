const Model = require('./model.js');
const NotFound = require('../Errors/NotFound.js');
 
module.exports = {
    all(){
        return Model.findAll({ raw: true });
    },
    store(data){
        return Model.create(data);
    },
    async show(id){
       const supply = await Model.findOne({
          where:{
              id:id
          } 
       });
       
       if (!supply)
         throw  new NotFound;

       return supply.dataValues;  
    },
    async update(id,data){
        return await Model.update(
            data,
            {
                where:{id:id}
            }
        );
    },
    async destroy(id){
        return await Model.destroy({
            where:{id:id}
        });
    }    
}
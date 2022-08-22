const NotAccetable = require("../Errors/NotAccetable.js");
const jsontoxml = require('jsontoxml');

class Serializer{    
    
    json (data){
        return JSON.stringify(data);
    }

    xml (data){
       let tag = this.tagSingle;
       
       if (Array.isArray(data)){
         tag = this.tagPlurol;
         data = data.map((item) => {
            return {
                [this.tagSingle]: item
            }
         });
       }

       return jsontoxml({ [tag]:data});    
    }

    serialize (data){
       data = this.filter(data); 

       if (this.contentType == 'application/json')
         return this.json(data);

       if (this.contentType == 'application/xml')
         return this.xml(data);

       throw new NotAccetable("content-type must be like application/json");  
    }

    filterObject (data){   
       const newData = {};
       
       this.publicFields.forEach((field) => {                    
          if (data.hasOwnProperty(field))
             newData[field] = data[field];
       });       
       return newData;
    }

    filter (data){
        if (Array.isArray(data)){           
            data = data.map(items => {
                return this.filterObject(items);
            });
        }else{           
            data = this.filterObject(data);
        }
        return data;
    }
}

class SerializerError extends Serializer{
    constructor(contentType){
       super();
       this.contentType = contentType;    
       this.publicFields = [
           'id',
           'empresa',
           'email',
           'message']; //.concat(extraFields || []);    
        this.tagSingle = "error";
        this.tagPlurol = "errors";    
    }
}

module.exports = {
    Serializer: Serializer,    
    SerializerError:SerializerError,
    acceptHeader: ['application/json','application/xml']
}
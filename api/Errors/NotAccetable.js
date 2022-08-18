class NotAccetable extends Error{
    constructor(){
       super();
       this.message = 'NotAccetable';
       this.idError = 2;    
    }
}

module.exports = NotAccetable;
 
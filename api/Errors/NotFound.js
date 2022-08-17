class NotFound extends Error{
    constructor(){
       super();
       this.message = 'Not Found';
       this.idError = 1;    
    }
}

module.exports = NotFound;
 
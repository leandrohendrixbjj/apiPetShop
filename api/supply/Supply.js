const Table = require('./table.js');

class Supply {
   constructor({id,empresa,email,categoria,dataCriacao,dataAtualizacao,versao}){
       this.id = id;
       this.empresa = empresa,
       this.email = email,
       this.categoria = categoria
       this.dataCriacao = dataCriacao,
       this.dataAtualizacao = dataAtualizacao,
       this.versao = versao
   }

   async store(){
      const store = await Table.store({
           empresa: this.empresa,
           email: this.email,
           categoria: this.categoria
       });
       this.id = store.id;
       this.dataCriacao = store.dataCriacao;
       this.dataAtualizacao = store.dataAtualizacao;
       this.versao = store.versao;      
   }

   static async all(){
       return await Table.all();
   }

   async show(){
       const supply = await Table.show(this.id);
       this.empresa = supply.empresa;
       this.email = supply.email;
       this.categoria = supply.categoria;
       this.dataCriacao = supply.dataCriacao;
       this.dataAtualizacao = supply.dataAtualizacao;
       this.versao = supply.versao;
       
       return supply;
   }

   async update(){
     await Table.show(this.id);
     const fields = ['empresa','email','categoria'];
     const data = {};

     for(let row in fields){
       const value = this[fields[row]];

       if (typeof value == 'string' && value.length > 0){
         data[fields[row]] = value;
       }else{
         throw new Error(`O campo ${fields[row]} não possui valor`);  
       }
     }

     if (Object.keys(data).length === 0)
       throw new Error('Obejct is empty');

     await Table.update(this.id,data);       
  }

   async delete(){
       return await Table.destroy(this.id);
   }   
}

module.exports = Supply;
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
     return await Table.update(this.id,{
       empresa:this.empresa,
       email:this.email,
       categoria: this.categoria
     });       
   }

   async delete(){
       return await Table.destroy(this.id);
   }   
}

module.exports = Supply;
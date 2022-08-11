const Model = require('./model.js');

Model.sync()
.then(() => console.log('Table was created successfully'))
.catch((error) => console.log(error));


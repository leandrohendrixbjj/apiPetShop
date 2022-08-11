const route = require('express').Router();
const Supply = require('./Supply.js');

route.get('/', async (req,res) => {
    res.json({'data': await Supply.all()});
});

module.exports = route;
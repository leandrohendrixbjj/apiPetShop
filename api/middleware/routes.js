const supplyRoute = require('../supply/route.js');

module.exports = (app) => {
    app.use('/api/supply', supplyRoute);
}
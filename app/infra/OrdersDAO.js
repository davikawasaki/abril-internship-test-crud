const DAO = require('./DAO');

module.exports = class OrdersDAO extends DAO {
    constructor() {
        super('Pedido');
    }
};
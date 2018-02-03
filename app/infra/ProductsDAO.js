const DAO = require('./DAO');

module.exports = class ProductsDAO extends DAO {
    constructor() {
        super('Produto');
    }
};
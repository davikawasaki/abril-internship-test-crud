const DAO = require('./DAO');

module.exports = class ClientsDAO extends DAO {
    constructor() {
        super('Cliente');
    }
};
const connectionFactory = require('./connectionFactory');

module.exports = class DAO {
    constructor(tableName) {
        this._tableName = tableName;
    }

    insertOne (object) {
        return connectionFactory.getConnection().query('INSERT INTO ' + this._tableName + ' SET ?', object);
    }

    listAll () {
        return connectionFactory.getConnection().query('SELECT * FROM ' + this._tableName);
    }

    getById (id) {
        return connectionFactory.getConnection().query('SELECT * FROM ' + this._tableName + ' WHERE id=?', id);
    }

    updateById (object) {
        return connectionFactory.getConnection().query('UPDATE ' + this._tableName + ' SET ? WHERE id=' + object.id + ';', object);
    }

    deleteById (id) {
        return connectionFactory.getConnection().query('DELETE FROM ' + this._tableName + ' WHERE id=?', id);
    }
}
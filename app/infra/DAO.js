const connectionFactory = require('./connectionFactory');

module.exports = class DAO {
    constructor(tableName) {
        this._connection = null;
        this._tableName = tableName;
    }

    insertOne (object) {
        return connectionFactory.createDBConnection(true)
            .then(conn => {
                this._connection = conn;
                return this._connection.query('INSERT INTO ' + this._tableName + ' SET ?', object)
            });
    }

    listAll () {
        return connectionFactory.createDBConnection(true)
            .then(conn => {
                this._connection = conn;
                return this._connection.query('SELECT * FROM ' + this._tableName)
            });
    }

    getById (id) {
        return connectionFactory.createDBConnection(true)
            .then(conn => {
                this._connection = conn;
                this._connection.query('SELECT * FROM ' + this._tableName + ' WHERE id=?', id)
            });
    }

    updateById (object) {
        return connectionFactory.createDBConnection(true)
            .then(conn => {
                this._connection = conn;
                this._connection.query('UPDATE ' + this._tableName + ' SET ? WHERE id=?', object, object.id)
            });
    }

    deleteById (id) {
        return connectionFactory.createDBConnection(true)
            .then(conn => {
                this._connection = conn;
                this._connection.query('DELETE FROM ' + this._tableName + ' WHERE id=?', id)
            });
    }

    closeConnection () {
        return this._connection.end();
    }
}
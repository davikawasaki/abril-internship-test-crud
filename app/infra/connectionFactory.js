const mysql = require('promise-mysql');

const dbName = 'crudabrilinternship';
const dbTestName = 'crudabrilinternshiptest';
let basicConnection = {host : 'localhost', user : 'root', password : 'root'};
let conn = null

// Factory method
function createDBConnection(database) {
    // DB for development
    if(!process.env.NODE_ENV) {
        if(database) basicConnection.database = dbName;
        return mysql.createConnection(basicConnection);
    }
    // DB for tests
    else if(process.env.NODE_ENV == 'test') {
        if(database) basicConnection.database = dbTestName;
        return mysql.createConnection(basicConnection);
    }
    // DB for production (heroku)
    else if(process.env.NODE_ENV == 'production') {
        const connectionUrl = process.env.CLEARDB_DATABASE_URL;
        const connectionSplitted = connectionUrl.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
        console.log(connectionSplitted);

        basicConnection = {
            host     : connectionSplitted[3],
            user     : connectionSplitted[1],
            password : connectionSplitted[2],
            database : connectionSplitted[4]
        };

        dbName = connectionSplitted[4];

        return mysql.createConnection(basicConnection);
    }
};

function createDatabase() {
    const databaseQuery = 'CREATE DATABASE IF NOT EXISTS ' + dbName;
    const dbUseQuery = 'USE ' + dbName;
    return createDBConnection(false)
        .then(connection => {
            conn = connection;
            return conn.query(databaseQuery);
        })
        .then(response => {
            return conn.query(dbUseQuery);
        });
};

function createInfrastructure() {
    const productsQuery = 'CREATE TABLE IF NOT EXISTS Produto (' +
        'id INT NOT NULL AUTO_INCREMENT, ' + 
        'nome VARCHAR(100) NOT NULL, ' +
        'descricao VARCHAR(150), ' +
        'preco FLOAT, ' +
        'PRIMARY KEY (id));';
    const clientsQuery = 'CREATE TABLE IF NOT EXISTS Cliente (' +
        'id INT NOT NULL AUTO_INCREMENT, ' + 
        'nome VARCHAR(100) NOT NULL, ' +
        'email VARCHAR(150), ' +
        'telefone VARCHAR(50), ' +
        'PRIMARY KEY (id));';
    const ordersQuery = 'CREATE TABLE IF NOT EXISTS Pedido ( '+
        'id INT NOT NULL AUTO_INCREMENT, ' +
        'id_produto INT NOT NULL, ' +
        'id_cliente INT NOT NULL, ' +
        'PRIMARY KEY (id), ' +
        'CONSTRAINT constr_pedidos_produto_fk ' +
            'FOREIGN KEY (id_produto) ' +
            'REFERENCES Produto(id) ' +
            'ON DELETE CASCADE ON UPDATE CASCADE, ' +
        'CONSTRAINT constr_pedidos_cliente_fk ' +
            'FOREIGN KEY (id_cliente) ' +
            'REFERENCES Cliente(id) ' +
            'ON DELETE CASCADE ON UPDATE CASCADE );';

    createDatabase()
        .then(response => {
            return conn.query(productsQuery);
        })
        .then(response => {
            return conn.query(clientsQuery);
        })
        .then(response => conn.query(ordersQuery))
        .then(response => conn.end())
        .catch(err => console.error(err));
}

// Prototype wrapper
module.exports = { createDBConnection, createInfrastructure }
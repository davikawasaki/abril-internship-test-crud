const app = require('./config/express')();
const connectionFactory = require('./app/infra/connectionFactory');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    const usedHost = server.address().address;
    const usedPort = server.address().port;

    console.log(`Running server at http://${usedHost}:${usedPort}`);

    connectionFactory.createInfrastructure()
        .then(response => connectionFactory.createDBConnection(true))
        .then(conn => connectionFactory.setConnection(conn));
});

server.on('close', () => {
    console.log("Closing out remaining connections.");
    connectionFactory.getConnection().end();
    console.log("DB connection closed.");
});

process.on('SIGINT', () => {
    server.close();
});
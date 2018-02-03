const app = require('./config/express')();
const connectionFactory = require('./app/infra/connectionFactory');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    const usedHost = server.address().address;
    const usedPort = server.address().port;

    console.log(`Running server at http://${usedHost}:${usedPort}`);

    connectionFactory.createInfrastructure();
})
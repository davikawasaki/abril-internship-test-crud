const ClientsCtrl = require('../controller/ClientsCtrl');

module.exports = app => {

    const clientsCtrl = new ClientsCtrl(app);

    /**
     * GET: Render clients list page
     * @param {Function} callback
     */
    app.get('/clients', function(req, res, next) {
        clientsCtrl.getClients(req, res, next);
    });

    /**
     * POST: Register a new client request
     * Address (/clients) + verb (POST)
     * @param {Function} callback
     */
    app.post('/clients', function(req, res, next) {
        clientsCtrl.registerClient(req, res, next);
    });

    /**
     * PUT: Update an existent client request
     * Address (/clients) + verb (PUT)
     * @param {Function} callback
     */
    app.put('/clients', function(req, res, next) {
        clientsCtrl.updateClient(req, res, next);
    });

    /**
     * DELETE: Delete an existent client request
     * Address (/clients) + verb (DELETE)
     * @param {Function} callback
     */
    app.delete('/clients', function(req, res, next) {
        clientsCtrl.deleteClient(req, res, next);
    });
}
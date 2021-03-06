const ClientsDAO = require('../infra/ClientsDAO');
const BaseCtrl = require('../controller/BaseCtrl');

module.exports = class ClientsCtrl extends BaseCtrl {
    constructor(app) {
        super(app, new ClientsDAO());
    }

    /**
     * Return clients list
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     */
    getClients (req, res, next) {
        this.list(req, res, next, 'clients', '');
    };

    /**
     * Process new client registration and redirect to clients if validation passes
     * Process POST method request to register a new client
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} app (express object)
     */
    registerClient (req, res, next) {
        req.assert('nome', 'Nome é obrigatório!').notEmpty();
        req.assert('email', 'Email é obrigatório!').notEmpty();
        req.assert('telefone', 'Telefone é obrigatório!').notEmpty();
        const valErrors = req.validationErrors();
        if(!valErrors) {
            const client = req.body;
            this.save(res, next, client, '/clients');
        } else this.list(req, res, next, 'clients', valErrors);
    };

    /**
     * Process client update and redirect to clients if validation passes
     * Process PUT method request to update an existent client
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} app (express object)
     */
    updateClient (req, res, next) {
        req.assert('nome', 'Nome é obrigatório!').notEmpty();
        req.assert('email', 'Email é obrigatório!').notEmpty();
        req.assert('telefone', 'Telefone é obrigatório!').notEmpty();
        const valErrors = req.validationErrors();
        if(!valErrors) {
            const client = req.body;            
            this.update(res, next, client, '/clients');
        } else this.list(req, res, next, 'clients', valErrors);
    };

    /**
     * Process client delete and redirect to clients if validation passes
     * Process DELETE method request to delete an existent client
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} app (express object)
     */
    deleteClient (req, res, next) {
        const id = req.body.id;
        this.delete(res, next, id, '/clients');
    };

}
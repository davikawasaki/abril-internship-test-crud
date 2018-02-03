const OrdersDAO = require('../infra/OrdersDAO');
const ProductsDAO = require('../infra/ProductsDAO');
const ClientsDAO = require('../infra/ClientsDAO');
const BaseCtrl = require('../controller/BaseCtrl');

module.exports = class OrdersCtrl extends BaseCtrl {
    constructor(app) {
        super(app, new OrdersDAO());
    }

    /**
     * Return orders list
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     */
    getOrders (req, res, next) {
        this.listOrdersProductsClients(req, res, next, '');
    };

    /**
     * Process new order registration and redirect to orders if validation passes
     * Process POST method request to register a new order
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} app (express object)
     */
    registerOrder (req, res, next) {
        req.assert('id_produto', 'Produto é obrigatório!').notEmpty();
        req.assert('id_cliente', 'Cliente é obrigatório!').notEmpty();
        const valErrors = req.validationErrors();
        if(!valErrors) {
            const order = req.body;
            this.save(res, next, order, '/orders');
        } else this.list(req, res, next, 'orders', valErrors);
    };

    /**
     * Process order update and redirect to orders if validation passes
     * Process PUT method request to update an existent order
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} app (express object)
     */
    updateOrder (req, res, next) {
        req.assert('id_produto', 'Produto é obrigatório!').notEmpty();
        req.assert('id_cliente', 'Cliente é obrigatório!').notEmpty();
        const valErrors = req.validationErrors();
        if(!valErrors) {
            const order = req.body;
            this.update(res, next, order, '/orders');
        } else this.list(req, res, next, 'orders', valErrors);
    };

    /**
     * Process order delete and redirect to orders if validation passes
     * Process DELETE method request to delete an existent order
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} app (express object)
     */
    deleteOrder (req, res, next) {
        const id = req.body.id;
        this.delete(res, next, id, '/orders');
    };

    /**
     * Access DAO through DB connection to list orders/products/clients objects and render to orders page
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} errors
     */
    listOrdersProductsClients(req, res, next, errors) {
        let obj = {}
        const clientsDAO = new ClientsDAO();
        const productsDAO = new ProductsDAO();
        this._dao.listAll()
            .then(response => {
                obj['orders'] = response;
                return clientsDAO.listAll();
            })
            .then(response => {
                obj['clients'] = response;
                return productsDAO.listAll();
            })
            .then(response => {
                obj['products'] = response;
                obj['error'] = errors;
                const self = this;
                res.format({
                    html() {
                        res.render('orders', obj);
                    },
                    json() {
                        res.json(obj);
                    }
                });
            })
            // Throwing errors to the next element of express flow
            .catch(err => next(err));
    };

}
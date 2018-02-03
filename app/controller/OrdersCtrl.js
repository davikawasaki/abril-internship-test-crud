const connectionFactory = require('../infra/connectionFactory');
const OrdersDAO = require('../infra/OrdersDAO');
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
        this.list(req, res, next, 'orders');
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
        const order = req.body;
        this.save(res, next, order, '/orders');
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
        const order = req.body;
        this.update(res, next, order, '/orders');
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

}
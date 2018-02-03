const OrdersCtrl = require('../controller/OrdersCtrl');

module.exports = app => {

    const ordersCtrl = new OrdersCtrl(app);

    /**
     * GET: Render orders list page
     * @param {Function} callback
     */
    app.get('/orders', function(req, res, next) {
        ordersCtrl.getOrders(req, res, next);
    });

    /**
     * POST: Register a new order request
     * Address (/orders) + verb (POST)
     * @param {Function} callback
     */
    app.post('/orders', function(req, res, next) {
        ordersCtrl.registerOrder(req, res, next);
    });

    /**
     * PUT: Update an existent order request
     * Address (/orders) + verb (PUT)
     * @param {Function} callback
     */
    app.put('/orders', function(req, res, next) {
        ordersCtrl.updateOrder(req, res, next);
    });

    /**
     * DELETE: Delete an existent order request
     * Address (/orders) + verb (DELETE)
     * @param {Function} callback
     */
    app.delete('/orders', function(req, res, next) {
        ordersCtrl.deleteOrder(req, res, next);
    });
}
const ProductsCtrl = require('../controller/ProductsCtrl');

module.exports = app => {

    const productsCtrl = new ProductsCtrl(app);

    /**
     * GET: Render products list or page
     * @param {Function} callback
     */
    app.get('/products', function(req, res, next) {
        productsCtrl.getProducts(req, res, next);
    });

    /**
     * POST: Register a new product request
     * Address (/products) + verb (POST)
     * @param {Function} callback
     */
    app.post('/products', function(req, res, next) {
        productsCtrl.registerProduct(req, res, next);
    });

    /**
     * PUT: Update an existent product request
     * Address (/products) + verb (PUT)
     * @param {Function} callback
     */
    app.put('/products', function(req, res, next) {
        productsCtrl.updateProduct(req, res, next);
    });

    /**
     * DELETE: Delete an existent product request
     * Address (/products) + verb (DELETE)
     * @param {Function} callback
     */
    app.delete('/products', function(req, res, next) {
        productsCtrl.deleteProduct(req, res, next);
    });
}
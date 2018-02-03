const connectionFactory = require('../infra/connectionFactory');
const ProductsDAO = require('../infra/ProductsDAO');
const BaseCtrl = require('../controller/BaseCtrl');

let connection = null;

connectionFactory.createDBConnection(true)
    .then(conn => connection = conn);

module.exports = class ProductsCtrl extends BaseCtrl {
    constructor(app) {
        super(app, new ProductsDAO(connection));
    }

    /**
     * Return products list
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     */
    getProducts (req, res, next) {
        this.list(req, res, next, 'products');
    };

    /**
     * Process new product registration and redirect to products if validation passes
     * Process POST method request to register a new product
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} app (express object)
     */
    registerProduct (req, res, next) {
        const product = req.body;
        this.save(res, next, product, '/products');
    };

    /**
     * Process product update and redirect to products if validation passes
     * Process PUT method request to update an existent product
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} app (express object)
     */
    updateProduct (req, res, next) {
        const product = req.body;
        this.update(res, next, product, '/products');
    };

    /**
     * Process product delete and redirect to products if validation passes
     * Process DELETE method request to delete an existent product
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} app (express object)
     */
    deleteProduct (req, res, next) {
        const id = req.body.id;
        this.delete(res, next, id, '/products');
    };

}
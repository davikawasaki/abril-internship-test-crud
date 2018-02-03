module.exports = class BaseCtrl {
    constructor(app, dao) {
        this._app = app;
        this._dao = dao;
    };

    /**
     * Access DAO through DB connection to list generic objects and render to specific page
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {String} page ('home/index')
     */
    list(req, res, next, page) {
        this._dao.listAll()
            .then(response => {
                // Receives a literal object and return a format depending on the request content negotiation
                const self = this;
                res.format({
                    html() {
                        self.render(res, response, page);
                    },
                    json() {
                        res.json(response);
                        self._dao.closeConnection();
                    }
                });
            })
            // Throwing errors to the next element of express flow
            .catch(err => next(err));
    };

    /**
     * Access DAO through DB connection to save generic object and render to specific page
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} object (generic object to be saved)
     * @param {String} page ('/products')
     */
    save(res, next, object, page) {
        this._dao.insertOne(object)
            .then(response => {
                this._dao.closeConnection();
                res.redirect(page);
            })
            // Throwing errors to the next element of express flow
            .catch(err => {
                this._dao.closeConnection();
                next(err);
            });
    };

    /**
     * Access DAO through DB connection to update generic object and render to specific page
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} object (generic object to be updated)
     * @param {String} page ('/products')
     */
    update(res, next, object, page) {
        this._dao.updateById(object)
            .then(response => {
                this._dao.closeConnection();
                res.redirect(page);
            })
            // Throwing errors to the next element of express flow
            .catch(err => {
                this._dao.closeConnection();
                next(err);
            });
    };

    /**
     * Access DAO through DB connection to delete generic object and render to specific page
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {String} idValue (generic id to be deleted)
     * @param {String} page ('/products')
     */
    delete(res, next, idValue, page) {
        this._dao.deleteById(idValue)
            .then(response => {
                this._dao.closeConnection();
                res.redirect(page);
            })
            // Throwing errors to the next element of express flow
            .catch(err => {
                this._dao.closeConnection();
                next(err);
            });
        this._dao.closeConnection();
    };

    /**
     * Render page depending on page args; then close DB connection
     * @param {Object} res (response)
     * @param {Array} results (results list from ProductsDAO)
     * @param {String} page (String page to be rendered)
     */
    render(res, results, page) {
        let obj = {}
        obj[page] = results
        res.render(page, obj);
    };
}
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {
    const app = express();

    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/view');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    consign({cwd: 'app'})
        .include('route')
        .into(app);
    
    app.get('/', function(req, res, next) {
        res.redirect('/orders');
    });

    app.get('*', function(req, res, next) {
        res.status(404).render('errors/404');
    });

    app.use((err, req, res, next) => {
        if(process.env.NODE_ENV == 'production') {
            if(err) {
                console.error(err);
                res.status(500).render('errors/500');
                return;
            }
        }
        console.error(err);
        next(err);
    });

    return app;
}
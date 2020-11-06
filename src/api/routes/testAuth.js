const { Router } = require('express');
const middlewares = require('../middlewares')
const route = Router();

module.exports = (app) => {
    app.use('/test-auth', route);

    route.post('/', middlewares.isAuth, (req, res) => {
        return res.json({ success: true }).status(200);
    });
};
const config = require('../../config');

const isAuth = (req, res, next) => {
    // verify key here
    if (typeof req.body.api_key !== 'undefined' && req.body.api_key !== null) {
        if (req.body.api_key === config.api_key) {
            return next();
        }
    }
    res.status(401).send('You are unauthorized to proceed');
};

module.exports = isAuth;
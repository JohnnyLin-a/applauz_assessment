const config = require('../../config');

const isAuth = (req, res, next) => {
    // verify key here
    next();
};

module.exports = isAuth;
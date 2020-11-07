const config = require('../../config');
const { validateApiKey } = require('../../services/auth');

const isAuth = (req, res, next) => {
    // verify key here
    if (typeof req.headers.api_key !== 'undefined' && req.headers.api_key !== null) {
        if (validateApiKey(req.headers.api_key)) {
            return next();
        }
    } else {
        res.statusCode = 401;
        res.json({ error: "You are unauthorized to proceed (No api_key)" });
    }
    res.statusCode = 401;
    res.json({ error: "You are unauthorized to proceed (Wrong api_key)" });
};

module.exports = isAuth;
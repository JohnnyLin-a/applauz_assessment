const config = require('../config');

const authService = {
    validateApiKey: api_key => {
        if (config.api_key === api_key) {
            return true;
        }
        return false;
    },
}

module.exports = authService
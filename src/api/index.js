const { Router } = require('express');
const user = require('./routes/user');

module.exports = () => {
	const app = Router();
	user(app);

	return app
}
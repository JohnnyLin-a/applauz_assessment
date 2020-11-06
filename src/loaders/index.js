const expressLoader = require('./express');

module.exports = async ({ expressApp }) => {
    // Add other loaders here
    await expressLoader({ app: expressApp });

};
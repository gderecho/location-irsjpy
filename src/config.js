
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {
    port: parseInt(process.env.IRSJPY_LOCATION_PORT, 10) || 4897,
    apikey: process.env.GOOGLE_MAPS_API_KEY,
    loglevel: process.env.IRSJPY_LOGLEVEL || 'silly',
    environment: process.env.NODE_ENV
}

// check for undefined
for(const key in module.exports) {
    if(module.exports.hasOwnProperty(key)) {
        if(typeof module.exports[key] === 'undefined') {
            throw new Error("Configuration error -- ".concat(key).concat(" is undefined"))
        }
    }
}

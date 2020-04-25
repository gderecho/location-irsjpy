
const winston = require('winston')

module.exports = function(config) {
    const logger = winston.createLogger({
        level: config.loglevel,
        transports: [
            new winston.transports.File({
                filename: 'irsjpy_location.log',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.splat(),
                    winston.format.json()
                ),
            })
        ]
    })
    if(config.environment !== 'prod') {
        logger.add(new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss SSS'
                }),
                winston.format.prettyPrint(),
            ),
        }))
    }
    return logger
}


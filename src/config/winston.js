const { configuredFormatter } = require('winston-json-formatter');
const { createLogger, transports } = require('winston');
const packageJson = require('../../package.json');
const config = require('./config');

const logger = createLogger({
    level: config.logLevel,
    transports: [
        new transports.Console(),
    ],
});

const options = {
    server: packageJson.name,
    logger: 'application-logger',
    version: packageJson.version,
};

logger.format = configuredFormatter(options);

module.exports = logger;
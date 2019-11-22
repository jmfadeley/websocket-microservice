const Joi = require('joi');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test'});
} else {
    dotenv.config();
}

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test'])
        .default('production')
        .description('The environment in which the server is running.'),
    LOG_LEVEL: Joi.string()
        .default('info')
        .description('The server logging output.'),
    X_PORT: Joi.number()
        .default(9001)
        .description('The port on which the server runs.'),
}).unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Configuration validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    logLevel: envVars.LOG_LEVEL,
    port: envVars.X_PORT,
};

module.exports = config;
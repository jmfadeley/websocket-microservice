import app from './config/express';
import config from './config/config';
import logger from './config/winston';

app.listen(config.port, () => {
    logger.info(`Server started on port ${config.port} (${config.env})`, {
        port: config.port,
        node_env: config.env,
    });
  }
);

export default app;
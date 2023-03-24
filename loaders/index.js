import expressLoader from './express.js';
import logger from './logger.js';
import errorHandler from './errorHandler.js';

export default (app) => {
    // databaseLoader(app);
    // logger.info('Mysql Connected');
    expressLoader(app);
    errorHandler(app);
    logger.info('Express Loaded');
}
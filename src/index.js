const dotenv = require('dotenv');
const app = require('./app');
const logger = require('./config/logger.config');

dotenv.config();

const port = process.env.PORT || 8081;
console.log(process.env.NODE_ENV);

let server;
// app.listen(port, () => console.log(`Server is running at ${port}`));
server = app.listen(port, () => {
    logger.info(`Server is running at ${port}`);
    console.log('process id', process.pid);
});

// Handle server errors
const exitHandler = () => {
    if (server)  {
        logger.info('Server closed.')
        process.exit(1);
    } else {
        process.exit(1);
    }
}

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    process.exit(1);
    exitHandler();
}

// SIGTERM
process.on('SIGTERM', () => {
    if (server) {
        logger.info('Server closed');
        process.exit(1);
    }
});

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);


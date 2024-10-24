const dotenv = require('dotenv');
const app = require('./app');
const logger = require('./config/logger.config');
const mongoose = require('mongoose');

dotenv.config();

// Env variables
const { MONGODB_URI } = process.env;
const port = process.env.PORT || 8081;
console.log(process.env.NODE_ENV);

// Exit on mongodb errors
mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB Connection error: ${err}`);
    process.exit(1);
});

// MongoDB debug mode
if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
};

// mongodb connection
mongoose.connect(MONGODB_URI, {}).then(() => logger.info('Connected to Mongo DB ...'));

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


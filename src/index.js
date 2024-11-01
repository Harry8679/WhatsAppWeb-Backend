const dotenv = require('dotenv');
const app = require('./app');
const logger = require('./config/logger.config');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

dotenv.config();

// Env variables
const { MONGODB_URI } = process.env;
const port = process.env.PORT || 8081;
console.log(process.env.NODE_ENV);

// CORS middleware
app.use(cors({
    origin: 'http://localhost:3040',  // Mettez ici le port correct pour votre front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Exit on MongoDB errors
mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB Connection error: ${err}`);
    process.exit(1);
});

// MongoDB debug mode
if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
}

// MongoDB connection
mongoose.connect(MONGODB_URI, {}).then(() => logger.info('Connected to MongoDB ...'));

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3040',  // Mettez ici le port correct pour votre front-end
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

// Configure Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected');
    // You can add more event listeners here, e.g., for disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
    console.log('Process ID', process.pid);
});

// Handle server errors
const exitHandler = () => {
    if (server) {
        logger.info('Server closed.');
        process.exit(1);
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

// SIGTERM handling
process.on('SIGTERM', () => {
    if (server) {
        logger.info('Server closed');
        process.exit(1);
    }
});

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

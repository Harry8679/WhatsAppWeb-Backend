const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize')
const cookieParser = require('cookie-parser');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const createHttpError = require('http-errors');
const routes = require('./routes/index');

dotenv.config();

const app = express();

// Morgan
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Helmet
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse json request body
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(mongoSanitize());

// Enable cookie parser
app.use(cookieParser());

// gzip compression
app.use(compression());

// file upload
app.use(fileUpload({
    useTempFiles: true,
}));

// cors
app.use(cors());

// Routes
app.use('/api/v1', routes);

app.get('/', (req, res) => {
    // res.send('Hello from Server API');
    throw createHttpError.BadRequest('This route has an error');
});

app.use(async (req, res, next) => {
    next(createHttpError.NotFound('This route does not exist'));
});

// error handling
app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});

module.exports = app;
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize')
const cookieParser = require('cookie-parser');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const cors = require('cors');

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

app.get('/', (req, res) => {
    res.send('Hello from Server API');
});

module.exports = app;
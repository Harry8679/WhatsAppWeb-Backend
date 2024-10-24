const dotenv = require('dotenv');
const app = require('./app');
const logger = require('./config/logger.config');

dotenv.config();

const port = process.env.PORT || 8081;
console.log(process.env.NODE_ENV);

// app.listen(port, () => console.log(`Server is running at ${port}`));
app.listen(port, () => logger.info(`Server is running at ${port}`));


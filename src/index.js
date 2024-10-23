const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Server is running at ${port}`));


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

_ = require('./database/mongo.database');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const accountRoute = require('./routes/account.route');
const userRoute = require('./routes/user.route');
app.use('/api/accounts', accountRoute);
app.use('/api/users', userRoute);

const port = process.env.port;
app.listen(port, () => console.log(`api port ${port}`));
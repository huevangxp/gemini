const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config();
const router = require('./routers/routes');

app.use(cors());

app.use(bodyParser.json({limit : '50mb', extended: true}))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true , parameterLimit: 50000000}))


app.use('/ai', router);

app.listen(3000, () => {
    console.log('Server running on port:', 3000);
});
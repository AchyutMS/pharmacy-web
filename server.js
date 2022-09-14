const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');

const adminRoute = require('./routes/adminRoute');
const operatorRoute = require('./routes/operatorRoute');
const salesmanRoute = require('./routes/salesmanRoute');
const storeRoute = require('./routes/storeRoute');

//Middlewares
app.use(express.json());
app.use('/api/admin', adminRoute);
app.use("/api/operator", operatorRoute);
app.use("/api/salesman", salesmanRoute);
app.use("/api/store", storeRoute);

//API Endpoints
const port = process.env.PORT || 5000;


app.listen(port, () => console.log('Server listening on port ' + port));

const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');

const userRoute = require('./routes/userRoute');

//Middlewares
app.use(express.json());
app.use("/api/user", userRoute);

//API Endpoints
const port = process.env.PORT || 5000;


app.listen(port, () => console.log('Server listening on port ' + port));

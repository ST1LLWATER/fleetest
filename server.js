const express = require('express');
const app = express();
const { ioredis_client } = require('./config/redis');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const mainRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin');
const fleetRoutes = require('./routes/fleet');
const deploymentRoutes = require('./routes/deployment');

require('dotenv').config({ path: './config/.env' });

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

//Setup Routes For Which The Server Is Listening
app.use('/', mainRoutes);
app.use('/fleet', fleetRoutes);
app.use('/deployment', deploymentRoutes);

//Server Running
app.listen(3000, () => {
  console.log(`Server started ${process.env.PORT}`);
});

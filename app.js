var createError = require('http-errors');
const express = require('express');
var path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const cors = require('cors')
var allrouters = require('./routes/It-secuity.route');

require('dotenv').config();

const mongoose = require('./config/mongoose');


const app = express();
const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            
            },
            
        },
        
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)

mongoose.connect();


app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// view engine setup

// app.use(jwt({ secret: jwt_key, algorithms: ['HS256']})
// .unless({path:[
//     '/IT-Security',
//     '/IT-Security/auth/login',
//     '/IT-Security/auth/signup',
    
// ]}));

app.use('/', allrouters);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;

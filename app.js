var createError = require('http-errors');
const express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var jwt = require('express-jwt');
const fileUpload = require('express-fileupload');
const cors = require('cors')
var allrouters = require('./routes/It-secuity.route');
const { jwt_key, port } = require('./config/vars');
const { routes } = require('./config/route');
require('dotenv').config();
const mongoose = require('./config/mongoose');


const app = express();
mongoose.connect();


//app.use('/uploads', express.static('uploads'));

app.use(fileUpload());
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

// view engine setup

app.use(jwt({ secret: jwt_key, algorithms: ['HS256']})
.unless({path:routes.public}));

app.use('/v1', allrouters);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.message)
  // render the error page
  res.status(err.status || 500);
  res.send('An error occured');
});

module.exports = app;

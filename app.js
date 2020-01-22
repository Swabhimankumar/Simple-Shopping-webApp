var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs=require('express-handlebars');
const bodyParser=require('body-Parser');
var session=require('express-session');
var flash=require('connect-flash');
const mongodb=require('mongodb');
const mongoose=require('mongoose');

const {check,validationResult } = require('express-validator');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productfill=require('./filled-data/product-fill');

var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/shopping";

mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex: true,useFindAndModify: false }, function(err, db) {
  if (err) throw err;
  console.log("Connected to Database");
  //db.close();
});
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.engine('.hbs',expressHbs({defaultLayout:'layout',extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'mysecret',resave:false,saveUninitialized:false}));
app.use(flash()); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',indexRouter);
app.use('/user', usersRouter);

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
  res.render('error');
});
app.use('*',(req,res)=>{
  //var err=new Error('Not Found');
  //err.status=404;
  //next(err);
  res.status(404).json({status:0,msg:"page not found"})
})

module.exports = app;

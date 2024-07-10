var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var aboutRouter = require('./routes/about')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/about', aboutRouter);

//Download Image Route
app.get('/download', (req, res) =>{
  let file = path.join(__dirname, 'public/images/Eevee.png');
  res.download(file, 'Eevee.png',  function (err){
    if (err){
      console.log('Error downloading image ', err);
    }
  })
});

//Post Request Button
app.post('/confirm_post', function (req, res){
  //Output in JSON format
  response = {  
    name: req.body.name 
  };  
  console.log(response);
  res.send(`${response.name} has been passed!`);
})

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


module.exports = app;

var createError = require('http-errors');
const express = require('express')
var db = require('./config/connection');
const app = express()
const usersRoute = require('./routes/userRouter')
let env = require('dotenv');
env.config()
// const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

db.connect((err)=>{
if(err) console.log("Databse connection error"+err)
else console.log("database is connected")
});
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// app.use(notFound)
// app.use(errorHandler)

app.use('/',usersRoute)

app.get('/api',(req,res)=>{
    res.json({ message: "Hello from serverers!" });
})


// app.use(function(req, res, next) {
//   next(createError(404));
// });


// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// listen port
app.listen(3001)

module.exports = app;
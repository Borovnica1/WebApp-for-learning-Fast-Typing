const express = require('express');
const session = require('express-session');
const path = require('path');
const pageRouter = require('./routes/pages');
var bodyParser = require('body-parser')
const app = express();


// for body parser.
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));


// ?>?>?>?>?>?>?>?>?
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// session
app.use(session({
    secret:'wow_video',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

// routers 
// Routers
app.use('/', pageRouter);

// errors: page not found 404
app.use((req, res, next) => {
    var err = new Error('Page not found!');
    err.status = 404;
    next(err);
})

// handling errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message)
})

app.listen(3000, () => {
    console.log('server is running')
})

module.exports = app;
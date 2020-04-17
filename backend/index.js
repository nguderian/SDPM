const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');
const http = require('http');
const nconf = require('nconf');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const lti = require('./canvas/lti');
const cron = require("node-cron");
const fs = require("fs");
const alerts = require('./controllers/alerts');

const app = express();

nconf.argv({
    'p': {
        'alias': 'http:port',
        'describe': 'The port to listen on'
    }
});
  
nconf.env("production");
nconf.file('./config/config.json');
  
nconf.defaults({
    "http": {
        "port": 3001
    }
});  


app.use(bodyParser.json());
app.use(cors());
app.use('/api', apiRoutes);
/*
// placeholder view for the LTI launch
app.set('view engine', 'pug');
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev',
  resave: false,
  saveUninitialized: true,
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.set('json spaces', 2);
app.enable('trust proxy');
app.get('/', (req, res, next) => {
  return res.send({status: 'Up'});
});
app.get('/application', (req, res, next) => {
  if (req.session.userId) {
    console.log('User ID: ' + req.session.userId);
    console.log('User: ' + req.session.userfullname);
    console.log('Course: ' + req.session.coursename);
    //placeholder page: this should be loading from the frontend instead
    return res.render('newpage', {
      email: req.session.email,
      username: req.session.userfullname,
      ltiConsumer: req.session.ltiConsumer,
      userId: req.session.userId,
      isTutor: req.session.isTutor,
      context_id: req.session.context_id
    })
  } else {
    next(new Error('Session invalid. Please login via LTI to use this application.'));
  }
});
app.post('/launch_lti', lti.handleLaunch);
*/
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev',
  resave: false,
  saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({extended: false}));
app.post('/launch_lti', lti.handleLaunch);

var server = http.createServer(app);
app.set('port', nconf.get('http:port'));
server.listen(nconf.get("http:port"));

cron.schedule("*/45 * * * * *", function() {
  alerts.sendEmailAlerts();
  console.log("running a task every minute");
});

server.on('listening', onListening);

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
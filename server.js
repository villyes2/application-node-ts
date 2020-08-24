const express = require('express')

// use process.env variables to keep private variables,
// be sure to ignore the .env file in github
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests
var User = require('./Models/User');

var db = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'root',
    database : 'TESTDATA'
  }
});

// Controllers - aka, the db queries
const main = require('./controllers/main')
const userrlogin = require('./Services/userloginregister')

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:4945']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))
app.post('/users', (req, res) => main.getUserData(req, res, db))
app.post('/users', (req, res) => main.postUserData(req, res, db))
app.get('/usersql', (req, res) => main.postUserSQLData(req, res, db))
// App Server Connection
app.post('/usersreg',(req, res) => userrlogin.register(req, res))
//app.post('/userslog',(req, res) => userrlogin.login(req, res))
/*app.post('/usersreg',(req, res) => {
  console.log("hello");
  User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
  })
  .then(user => {
      //req.session.user = user.dataValues;
      req.user = user.dataValues;
     // res.redirect('/dashboard');
  })
  .catch(error => {
     // res.redirect('/signup');
      console.log(error);
  });
});
*/
app.post('/userslog',(req, res) => {
  var email = req.body.email,
      password = req.body.password;

  User.findOne({ where: { email: email } }).then(function (user) {
      console.log(user)

      var jsonData = user;

// parse json
var jsonParsed = JSON.parse(JSON.stringify(jsonData));
var jemail = email;
var jpass = jsonParsed.password;

console.log(jemail);

//
      if (!user) {
        //if (jemail != email) {
         // res.redirect('http://localhost:4945/login');
          res.status(401).json({message:'User Does Not Exist',error});
      } else if (!user.validPassword(password)) {
        // res.redirect('http://localhost:4945/login');
         console.log("Incorrect Password")
         res.status(401).json({message:'Incorrect Password',error});
      } else {
          req.user = user.dataValues;
         
         // console.log(user)
         // res.redirect('http://localhost:4945/home');
          console.log("success return")
          res.status(200).json({message:'success return',user});
          return user = user.dataValues;
      }      
  });
});
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/logs/debuglog.txt', {flags : 'w'});
var log_stdout = process.stdout;

app.listen(process.env.PORT || 8118, () => {
  console.log(`app is running on port ${process.env.PORT || 8118}`)
})

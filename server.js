/* Using the following code, we make sure that the server is working ...
const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => res.send('<h1>Hello Express</h1>'));

app.listen(PORT, console.log('Server is running on port: ' + PORT));
*/

require('dotenv').config();

const express = require('express');
// const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const db = require('./config/database');
// const { init: initAuth } = require('./auth');
const mongoose = require('mongoose');
const customResourceResponse = require('./utils/constants');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;

// app.use(express.urlencoded({extended: false}));

// initAuth();
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// init passport để sử dụng login session cho gg, apple, fb 
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', authRoutes);

app.use((res, rep) => {
  res.status(404).send({
    message: 'The requested URL could not be found.',
    statusCode: 404,
  });
})

app.use((error, req, res, next) => {
  const { message } = customResourceResponse.serverError;
  const data = {
      Code: `${error.code ? error.code : ''}`,
      Stacktrace: `${error.stack}`
  };
  res.status(500).json({ message, data });
});

mongoose.connect(db.mainDbMongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  console.log(`User server started and listening on port ${PORT}`);
  app.listen(PORT, console.log('Server is running on port: ' + PORT));
})
.catch(err => console.log(err));
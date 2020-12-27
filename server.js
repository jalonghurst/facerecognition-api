const express = require('express');
const bodyParser = require('body-parser');
// const { reset } = require('nodemon');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex'); 

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  // Enter your own database information here based on what you created
  client: 'pg',
  connection: {
    // host : 'postgresql-crystalline-77618',
    // user : 'jacquelinelonghurst',
    // password : '',
    // database : 'smartbrain',
    connectionString: process.env.DATABASE_URL,
    ssl : true,

  }
});


const app = express();

app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res) => {res.send('success') })
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req,res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})

// ENDPOINTS TO WORK ON

// /route route that res = this is working
// /signin route - that is a post request, posting user info, res = success /or fail
// /register will be a POST request to add the data to the database/a variable in the server with new user info. post = user
// /profile/:userId --> GET = user
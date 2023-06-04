const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const authMiddleware = require('./authMiddleware');

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 5000;

require('dotenv').config({ path: `.env.development.local` })

const User = require('./models/User.js');

app.use(express.json());
app.use(cookieParser());

const SESSION_SECRET = process.env.SESSION_SECRET;
console.log(SESSION_SECRET);
// mongo connection
const mongoURI = 'mongodb://127.0.0.1:27017';
const dbName = 'yummyDB';
const collectionName = 'posts';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`${mongoURI}/${dbName}`);
}

app.use(cors());

mongoose.connection.on('connected', () => console.log('connected'));

app.get('/checkToken', authMiddleware, function(req, res) {
  res.sendStatus(200);
});

// create post
app.post('/posts', async (req, res) => {
  try {
    const { title, body } = req.body;

    const client = await mongodb.MongoClient.connect(mongoURI);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne({ title, body });

    client.close();

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// retrieve all posts
app.get('/posts', async (req, res) => {
  console.log(req.body);
  try {
    const client = await mongodb.MongoClient.connect(mongoURI);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const posts = await collection.find().toArray();

    client.close();

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//AUTHENTICATION

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true},
  body: { type: String, required: true}
});

const Post = mongoose.model('Post', postSchema);

app.get('/api/check-auth', async (req, res) => {
  try {
    if (req.session.user) {
      const { id, email } = req.session.user;
      const user = await User.findById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: 'Invalid session' });
      }
    } else {
      res.status(401).json({ message: 'No session found' });
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/register', function(req, res) {
  const { email, username, password } = req.body;
  const user = new User({ username, email, password });
  user.save().
    then(function () {
      return res.sendStatus(200);
    }).catch(function (err) {
      console.log(err);
      return res.sendStatus(500);
    })
  });

app.post('/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(function (user) {
      if (!user)
      {
        res.sendStatus(401);
      }
      else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, SESSION_SECRET, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
        }
      });

      }

    }).catch(function (err) {
      console.log(error);
      res.sendStatus(500);
    }) 
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
require('dotenv').config({ path: `.env.development.local` })

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const multer = require('multer');

const authMiddleware = require('./authMiddleware');

const PORT = process.env.PORT ? process.env.PORT : 5000;
const CLIENT_URL = process.env.CLIENT_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGO_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'yummyDB';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination directory where uploaded images will be saved
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Set the filename to be used for the saved image
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

mongoose.connect(
  `${MONGO_URI}/${DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log(err));

const User = require('./models/User.js');
const Post = require('./models/Post.js')
const Image = require('./models/Image.js')
const Location = require('./models/Location.js')

const app = express();

app.use(express.static('uploads'));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));

app.use(cookieParser(SESSION_SECRET));


app.get('/checkToken', authMiddleware, function(req, res) {
  res.sendStatus(200);
});

app.post('/posts', upload.single('image'), async (req, res) => {
  try {
    const image = new Image({
      filename: req.file.filename,
      filePath: req.file.path
    })

    await image.save();

    const location = new Location({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      addressName: req.body.addressName
    });

    await location.save();

    const { title, body } = req.body;
    const post = new Post({ 
      title: title, 
      body: body, 
      image: image._id, 
      resolved: false,
      location: location._id
    });

    post.save()

    return res.status(200).send('Post created successfully');
  }
  catch(err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
});

// retrieve all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('image').populate('location').exec()
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/register', function(req, res) {
  const { email, username, password } = req.body;
  const user = new User({ username, email, password });
  user.save().
    then(function () {
        const payload = { email };
        const token = jwt.sign(payload, SESSION_SECRET, {
          expiresIn: '1h'
        });
        res.cookie('token', token, { httpOnly: true })
          .sendStatus(200);
      
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
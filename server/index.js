const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(express.json());

// mongo connection
const mongoURI = 'mongodb://127.0.0.1:27017';
const dbName = 'yummyDB';
const collectionName = 'posts';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`${mongoURI}/${dbName}`);
}

mongoose.connection.on('connected', () => console.log("Connected"));

// create post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, body } = req.body;

    const client = await mongodb.MongoClient.connect(mongoURI);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne({ title, body });

    client.close();

    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// retrieve all posts
app.get('/api/posts', async (req, res) => {
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
})

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  try {
    const { username, email, password} = req.body;

    const existingUser = await User.findOne({ email });
    if(existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'secretkey');

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});






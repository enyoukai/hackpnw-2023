require('dotenv').config({ path: `.env.development.local` })
const jwt = require('jsonwebtoken');
const SECRET = process.env.SESSION_SECRET;
console.log(SECRET);

const authMiddleware = function(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        console.log(err);
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}
module.exports = authMiddleware;
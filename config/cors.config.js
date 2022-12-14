const createError = require('http-errors');
const cors = require('cors');

const allowedOrigins = ['http://localhost:8083', 'http://www.justlaunched.xyz', 'https://justlaunched.herokuapp.com', 'https://www.justlaunched.xyz', 'https://justlaunched.xyz'];

module.exports = cors({
  credentials: true,
  origin: (origin, next) => {
    console.log(origin)
    const allowed = !origin || allowedOrigins.indexOf(origin) !== -1;
    if (allowed) {
      next(null, allowed);
    } else {
      next(createError(401, 'Not allowed by CORS'));
    }
  }
});

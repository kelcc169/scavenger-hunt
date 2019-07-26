require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const cloudinary = require('cloudinary');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');

const app = express();
const upload = multer({dest: './uploads'});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'Scavengers',
  allowedFormats: ['jpg', 'png'],
  transformations: [{width: 100, height: 100, crop: 'limit'}]
});

const parser = multer({storage: storage})

const loginLimiter = new RateLimit({
  windowMs: 5*60*1000,
  max: 3,
  delayMs: 0,
  message: 'Maximum login attempts exceeded'
});

const signupLimiter = new RateLimit({
  windowMs: 60*60*1000,
  max: 3,
  delayMs: 0,
  message: 'Maximum accounts created. Please try again later'
});

mongoose.connect('/mongodb://localhost/scavenger', {useNewUrlParser: true, useFindAndModify: false});
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Connected to Mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
  console.log(`Database error:\n${err}`);
});

// app.use('/auth/login', loginLimiter);
// app.use('/auth/signup', signupLimiter);

app.post('/imageupload', upload.single('myFile'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, function (result) {
    res.json(result.secure_url)
  })
})

app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));

app.listen(process.env.PORT, () => {
  console.log(`You're listening to port ${process.env.PORT}...`)
});

// expressJWT({secret: process.env.JWT_SECRET}),
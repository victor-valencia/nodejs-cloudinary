const config = require('./config.js');
const cloudinary = require('cloudinary').v2;
const gallery = require('./gallery');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const multer = require('multer');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage });

cloudinary.config({
  cloud_name: config.CLOUDINARY.CLOUD_NAME,
  api_key: config.CLOUDINARY.API_KEY,
  api_secret: config.CLOUDINARY.API_SECRET
});

// console.log(`NODE_ENV=${config.NODE_ENV}`);

app.get('/', (req, res) => {

  res.render('pages/index', {gallery: gallery.getAll()});

});

app.post('/upload', (req, res, next) => {
    
  const upload = multer({ storage }).single('image')
  upload(req, res, function(err) {
    if (err) {
      // console.log(err);
      return res.send(err)
    }
    cloudinary.uploader.upload(req.file.path)
      .then((result) => {
        gallery.add(result);
        res.redirect('/');
      }).catch((error) => {
        res.status(500).send({
          message: "failure",
          error,
        });
      });
  })

});

app.get('/delete/:id', (req, res, next) => {
    
  cloudinary.uploader.destroy(req.params.id)
    .then((result) => {
      gallery.delete(req.params.id);
      console.log(result);
      res.redirect('/');
    }).catch((error) => {
      res.status(500).send({
          message: "failure",
          error,
      });
    });

});

app.listen(config.PORT, config.HOST, function () {
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});
// server.js
const config = require('./config.js');
// const cloudinary = require('./cloudinary.js');
const cloudinary = require('cloudinary').v2;
const localStorage = require('localStorage');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const multer = require('multer')


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
        //console.log(file)
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

cloudinary.config({
    cloud_name: config.CLOUDINARY.CLOUD_NAME,
    api_key: config.CLOUDINARY.API_KEY,
    api_secret: config.CLOUDINARY.API_SECRET
});

console.log(`NODE_ENV=${config.NODE_ENV}`);
// console.log(config);

app.get('/', (req, res) => {
//   res.send('Hello world');
  var gallery = JSON.parse(localStorage.getItem('gallery')) || [];

//   console.log(localStorage.getItem('key'));
  res.render('pages/index', {gallery: gallery});

});

app.post('/upload', (req, res, next) => {
    
    const upload = multer({ storage }).single('image')
    upload(req, res, function(err) {
      if (err) {
        console.log(err);
        return res.send(err)
      }
    //   console.log(req.file);
      cloudinary.uploader.upload(req.file.path)
        .then((result) => {

            var gallery = JSON.parse(localStorage.getItem('gallery')) || [];
            gallery.unshift(result);

            localStorage.setItem('gallery', JSON.stringify(gallery));

            // console.log('cloudinary',result);
            res.redirect('/');
            
        }).catch((error) => {
            res.status(500).send({
                message: "failure",
                error,
            });
        });

    //   res.json(req.file)
    })
  })


app.listen(config.PORT, config.HOST, function () {
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});
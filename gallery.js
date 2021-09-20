const config = require('./config.js');
const localStorage = require('localStorage');


function Gallery(){

    // CloudinarySDK.config({
    //     cloud_name: config.CLOUDINARY.CLOUD_NAME,
    //     api_key: config.CLOUDINARY.API_KEY,
    //     api_secret: config.CLOUDINARY.API_SECRET
    // }); 
    // // PaypalSDK.configure(config.PAYPAL.configure);

}

//Get all images
Gallery.prototype.getAll = function() {

    return JSON.parse(localStorage.getItem('gallery')) || [];

}

//Add image
Gallery.prototype.add = function(result) {

    var gallery = this.getAll();
    gallery.unshift(result);
    localStorage.setItem('gallery', JSON.stringify(gallery));
    return gallery;

}

//Add image
Gallery.prototype.delete = function(public_id) {

    var gallery = this.getAll();
    gallery = gallery.filter(function (result) {
        return result.public_id != public_id;
    });
    localStorage.setItem('gallery', JSON.stringify(gallery));
    return gallery;

}


// // Returna la URL para procesar un pago fallido u otros errores
// Paypal.prototype.getErrorURL = function() {

//     return config.PAYPAL.url_error;

// }


module.exports = new Gallery()
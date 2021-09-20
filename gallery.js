const config = require('./config.js');
const localStorage = require('localStorage');


function Gallery(){

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

module.exports = new Gallery()
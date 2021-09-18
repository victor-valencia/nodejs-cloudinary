const dotenv = require('dotenv').config();
const url = require('url');

let cloudinaryURI = url.parse(process.env.CLOUDINARY_URL, false);
// console.log(cloudinaryURI);

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3000,
    CLOUDINARY: {
        CLOUD_NAME: cloudinaryURI.host || 'YOUR_CLOUD_NAME',
        API_KEY: cloudinaryURI.auth.split(":")[0] || 'YOUR_API_KEY',
        API_SECRET: cloudinaryURI.auth.split(":")[1] || 'YOUR_API_SECRET'
    }
}
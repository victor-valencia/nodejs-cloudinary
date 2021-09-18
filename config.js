const dotenv = require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3000,
    CLOUDINARY: {
        CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUD_NAME',
        API_KEY: process.env.CLOUDINARY_API_KEY || 'YOUR_API_KEY',
        API_SECRET: process.env.CLOUDINARY_API_SECRET|| 'YOUR_API_SECRET'
    }
}
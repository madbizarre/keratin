var config = require('../config');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: config.get('mail:service'),
    auth: {
        user: config.get('mail:user'),
        pass: config.get('mail:password')
    }
});

module.exports = transporter;
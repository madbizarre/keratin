"use strict";
var express = require('express');
var router = express.Router();
var transporter = require('../lib/nodemailer');
var config = require('../config');

router.get('/', function (req, res, next){
    res.render('index');
});

router.post('/mail', function (req, res, next){
    let mail = config.get('mail'),
        text = `Имя: ${req.body.name || 'не указано'}
Email: ${req.body.email || 'не указан'}
Телефон: ${req.body.tel}
Комментарий: ${req.body.comment || 'не указан'}`;
    transporter.sendMail({
        from: `${mail.from} <${mail.user}>`,
        to: mail.to.split(', '),
        subject: mail.from,
        text: text
    }, function (err){
        if (err) return next(err);
        res.status(200).end();
    });
});

/*router.get('/!*', function(req, res){
 res.redirect('/');
 });*/

module.exports = router;

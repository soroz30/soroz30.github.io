var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var nodemailer = require('nodemailer');

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
         user:'marek.koseski1986@gmail.com',
         pass: 'Hjjdsoe4!'
    }
});

var send = function (res, email, name, text) {
    var message = {
        from: email,
        to: 'marek.koseski1986@gmail.com',
        subject: 'message from ' + email,
        text: text
    }
    
    transporter.sendMail(message);
}

app.post('/contact', function(req, res) {

  var email = req.body.email
  var name = req.body.name
  var message = req.body.message
      
  send(res, email, name, message)
});
  
app.listen(3000);


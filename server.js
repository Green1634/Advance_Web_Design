var express = require('express');

var app = express();

var dbUrl = 'mongodb://username:pass@ds257981.mlab.com:57981/simple-chat';

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(__dirname));
var mongoose = require('mongoose');


var server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
   });

mongoose.connect(dbUrl , (err) => { 
    console.log('mongodb connected',err);
});

var Message = mongoose.model('Message',{ name : String, message : String})

app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
        if(err)
        sendStatus(500);
        res.sendStatus(200);
    })
})
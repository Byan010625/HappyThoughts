const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
var mongoDB = 'mongodb+srv://jaikumar:Chicagobulls30@cluster0-ajvse.mongodb.net/local_library?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser : true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const app = express();

const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());

var httpServer = http.createServer(app)
httpServer.listen(8080)

const port = 4000;
//"C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectID

const Quote = new Schema({
    body: String,
    author: String
})
const Song = new Schema({
    link: String
})
const Gratitude = new Schema({
    body: String,
    user: String,
    date: Date
})
const User = new Schema({
    username: String,
    password: String,
    happyLevel: Array
})

const Gratitudes = mongoose.model('Gratitudes', Gratitude);
const Quotes = mongoose.model('Quotes', Quote);
const Songs = mongoose.model('Songs', Song);
const Users = mongoose.model('Users', User);

app.get('/api/gratitude', (req, res) => {
    Gratitudes.find({body: {$exists: true}}, 'body user date', function(err, doc) {
        if(err) console.log(err);
        res.send(doc)
    })
})

app.get('/api/song', (req, res) => {
    Songs.find({link: {$exists: true}}, 'link', function(err, doc) {
        if(err) console.log(err);
        console.log('aosdfhoiahogehiofhieohfioeafioahef',doc)
        res.send(doc)
    })
})

app.get('/api/quote', (req, res) => {
    Quotes.find({body: {$exists: true}}, 'body author', function(err, doc) {
        console.log(doc)
        res.send(doc)
    })
})

app.post('/api/gratitude', (req, res) => {
    Gratitudes.create(req.body, function(err, messages) {
        if(err) console.log(err);
        console.log('Message created:', messages);
        res.status(200)
    })
})

/*
app.post('/api/user', (req, res) => {
    bcrypt.hash(req.body[1].password, saltRounds, function(err, hash) {
        Users.create(req.body, function(err, users) {
            if(err) console.log(err)
            console.log('User added:', users);
            res.status(200)
        })
    })
})

app.get('/api/user', (req, res) => {
    Users.find({password: req.body[0].username}, function(err, pass) {
        bcrypt.compare(req.body[1].password, pass[2].password, function(err, res) {
            if(err) console.log(err);
            if(res) {

            }
        })
    })
})
*/

app.listen(port, () => console.log('Server listening on port: ${port}'))
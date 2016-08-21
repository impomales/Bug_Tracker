var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var mongo = require('mongodb').MongoClient
var db

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'static')))

app.get('/api/bugs', function(req, res) {
    // status 200: OK
    db.collection('bugs').find().toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs)
    })
})

app.post('/api/bugs', function(req, res) {
    console.log(req.body)
    var newBug = req.body
    db.collection('bugs').insertOne(newBug, function(err, result) {
        if (err) throw err
        var newId = result.insertedId;
        db.collection('bugs').find({_id: newId}).next(function(err, doc) {
            if (err) throw err
            res.json(doc)
        })
    })
})

mongo.connect('mongodb://localhost:27017/bugsdb', function(err, dbConn) {
    if (err) throw err
    db = dbConn
    var server = app.listen(process.env.PORT || 8080, function() {
        console.log('Server is running at port ' + server.address().port)
    })
})
var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var mongo = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;
var db

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'static')))

app.get('/api/bugs', function(req, res) {
    // status 200: OK
    var filter = {}
    if (req.query.priority) filter.priority = req.query.priority
    if (req.query.status) filter.status = req.query.status
    db.collection('bugs').find(filter).toArray(function(err, docs) {
        if (err) throw err
        res.json(docs)
    })
})

app.get('/api/bugs/:id', function(req, res) {
    db.collection("bugs").findOne({_id: ObjectId(req.params.id)}, function(err, bug) {
        if (err) throw err
        res.json(bug)
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

app.put('/api/bugs/:id', function(req, res) {
    var bug = req.body
    var oid = ObjectId(req.params.id)
    
    db.collection('bugs').updateOne({_id: oid}, bug, function(err, result) {
        if (err) throw err
        db.collection('bugs').find({_id: oid}).next(function(err, doc) {
            if (err) throw err
            res.send(doc)
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
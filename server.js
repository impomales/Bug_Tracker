var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var bugs = [
    {id: 1, status: 'open', priority: 'p1', owner: 'Isaias', title: 'App crashes on open'},
    {id: 2, status: 'closed', priority: 'p2', owner: 'Mark', title: 'Infinite loop'}
]

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'static')))

app.get('/api/bugs', function(req, res) {
    // status 200: OK
    res.status(200).json(bugs)
})

app.post('/api/bugs', function(req, res) {
    console.log(req.body)
    var newBug = req.body
    bugs.push(newBug)
    res.json(newBug)
})

var server = app.listen(process.env.PORT || 8080, function() {
    console.log('Server is running at port ' + server.address().port)
})
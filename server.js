var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, 'static')))

var server = app.listen(process.env.PORT || 8080, function() {
    console.log('Server is running at port ' + server.address().port)
})
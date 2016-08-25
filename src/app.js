var React = require('react');
var ReactDOM = require('react-dom');

var BugList = require('./BugList')

ReactDOM.render(
    <BugList source='api/bugs'/>, 
    document.getElementById('main')
);
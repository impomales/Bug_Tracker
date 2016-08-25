var React = require('react');
var $ = require('jquery');

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

var BugTable = React.createClass({
    render: function() {
        var list = this.props.bugs.map(function(item) {
            return (
                <BugRow 
                    key={item._id}
                    bug={item}
                />
            );
        });
        return (
            <div className='bugTable'>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Owner</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        );
    }
});

var BugRow = React.createClass({
   render: function() {
       return (
           <tr className='bugRow'>
                <td>{this.props.bug._id}</td>
                <td>{this.props.bug.status}</td>
                <td>{this.props.bug.priority}</td>
                <td>{this.props.bug.owner}</td>
                <td>{this.props.bug.title}</td>
           </tr>
        );
   } 
});

var BugList = React.createClass({
    getInitialState: function() {
        return {bugs: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.source,
            success: function(data) {
                this.setState({bugs: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    addBug: function(owner, title) {
        var id = this.state.bugs.length + 1;
        var newBug = {id: id, status: 'new', priority: 'p1', owner: owner, title: title};
        $.ajax({
            url: this.props.source,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newBug),
            success: function(data) {
                var bugsMod = this.state.bugs.concat(data);
                this.setState({bugs: bugsMod});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className='bugList'>
                <h1>Bug Tracker</h1>
                <BugFilter />
                <BugTable bugs={this.state.bugs}/>
                <BugAdd addBug={this.addBug}/>
            </div>
        );
    }
});

module.exports = BugList;
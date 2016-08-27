var React = require('react');
var Link = require('react-router').Link;
var PageHeader = require('react-bootstrap/lib/PageHeader');
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
                <h3>Bugs</h3>
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
                <td>
                    <Link to={/bugs/ + this.props.bug._id}>{this.props.bug._id}</Link>
                </td>
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
        this.loadData();
    },
    componentDidUpdate: function(prevProps) {
        var oldQuery = prevProps.location.query;
        var newQuery = this.props.location.query;
        
        if (oldQuery.priority === newQuery.priority &&
            oldQuery.status === newQuery.status) return;
        else this.loadData();
    },
    handleSubmit: function(filter) {
        this.changeFilter(filter)
    },
    changeFilter: function(newFilter) {
        this.props.history.push({search: '?' + $.param(newFilter)});
    },
    loadData: function() {
        var query =  this.props.location.query || {};
        var filter = {priority: query.priority, status: query.status};
        
        $.ajax('/api/bugs', {data: filter}).done(function(data) {
            this.setState({bugs: data});
        }.bind(this));
    },
    addBug: function(owner, title) {
        var id = this.state.bugs.length + 1;
        var newBug = {id: id, status: 'new', priority: 'p1', owner: owner, title: title};
        $.ajax({
            url: '/api/bugs',
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
                <PageHeader>
                    Bug Tracker <small>MERN stack tutorial</small>
                </PageHeader>
                <BugFilter handleSubmit={this.handleSubmit} initFilter={this.props.location.query}/>
                <BugTable bugs={this.state.bugs}/>
                <BugAdd addBug={this.addBug}/>
            </div>
        );
    }
});

module.exports = BugList;
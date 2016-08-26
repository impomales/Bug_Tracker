var React = require('react');
var $ = require('jquery');

var BugEdit = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        this.loadData();
    },
    componentDidUpdate: function(prevProps) {
        if (this.props.params.id != prevProps.params.id) this.loadData();
    },
    loadData: function() {
        $.ajax('/api/bugs/' + this.props.params.id).done(function(bug) {
            this.setState(bug);
        }.bind(this));
    },
    handlePriorityChange: function(e) {
        this.setState({priority: e.target.value})
    },
    handleStatusChange: function(e) {
        this.setState({status: e.target.value})
    },
    handleOwnerChange: function(e) {
        this.setState({owner: e.target.value})
    },
    handleTitleChange: function(e) {
        this.setState({title: e.target.value})
    }, 
    handleSubmit: function(e) {
        e.preventDefault();
        var bug = {
            status: this.state.status,
            priority: this.state.priority,
            owner: this.state.owner,
            title: this.state.title
        }
        
        $.ajax({
            url: '/api/bugs/' + this.props.params.id, type: 'PUT', contentType: 'application/json',
            data: JSON.stringify(bug),
            dataType: 'json',
            success: function(bug) {
                alert('bug successfully edited')
                this.setState(bug);
            }.bind(this),
        })
    },
    render: function() {
        return (
            <div className='bugEdit'>
                <h2>Edit bug: {this.props.params.id}</h2>
                <form className='bugEditForm' onSubmit={this.handleSubmit}>
                    Priority:
                    <select name="priority" value={this.state.priority} onChange={this.handlePriorityChange}>
                        <option value='p1'>p1</option>
                        <option value='p2'>p2</option>
                        <option value='p3'>p3</option>
                    </select><br />
                    Status:
                    <select name='status' value={this.state.status} onChange={this.handleStatusChange}>
                        <option value='open'>open</option>
                        <option value='closed'>closed</option>
                        <option value='new'>new</option>
                        <option value='fixed'>fixed</option>
                    </select><br />
                    Owner:
                    <input type='text' value={this.state.owner || ''} onChange={this.handleOwnerChange} />
                    <br />
                    Title:
                    <input type='text' value={this.state.title || ''} onChange={this.handleTitleChange} />
                    <br />
                </form>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
});

module.exports = BugEdit;
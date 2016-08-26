var React = require('react');

var BugFilter = React.createClass({
    getInitialState: function() {
        return {priority: '', status: ''}
    },
    handlePriorityChange: function(e) {
        this.setState({priority: e.target.value})
    },
    handleStatusChange: function(e) {
        this.setState({status: e.target.value})
    },
    handleClick: function() {
        this.props.handleSubmit({priority: this.state.priority, status: this.state.status});
    },
    render: function() {
        return (
            <div className='bugFilter'>
                <h3>Filter</h3>
                <form id="bugFilterForm">
                    <select name="priority" value={this.state.priority} onChange={this.handlePriorityChange}>
                        <option value="">(Any)</option>
                        <option value='p1'>p1</option>
                        <option value='p2'>p2</option>
                        <option value='p3'>p3</option>
                    </select>
                    <select name="status" value={this.state.status} onChange={this.handleStatusChange}>
                        <option value="">(Any)</option>
                        <option value='open'>open</option>
                        <option value='new'>new</option>
                        <option value='closed'>closed</option>
                    </select>
                </form>
                <button onClick={this.handleClick}>Filter</button>
            </div>
        );
    }
});

module.exports = BugFilter;
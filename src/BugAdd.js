var React = require('react');

var BugAdd = React.createClass({
    getInitialState: function() {
        return {owner: '', title: ''};  
    },
    handleOwnerChange: function(e) {
        this.setState({owner: e.target.value});
    },
    handleTitleChange: function(e) {
        this.setState({title: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.addBug(this.state.owner, this.state.title);
        this.setState({owner: '', title: ''});
    },
    render: function() {
        return (
            <div className='bugAdd'>
                <h3>Add a Bug</h3>
                <form name='bugAddForm'>
                    <input 
                        type='text'
                        placeholder='owner'
                        value={this.state.owner}
                        onChange={this.handleOwnerChange}
                    />
                    <input 
                        type='text'
                        placeholder='title'
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                    <input className='button' type='button' value='Post'  onClick={this.handleSubmit}/>
                </form>
            </div>
        );
    }
});

module.exports = BugAdd;
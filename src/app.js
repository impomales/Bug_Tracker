var BugFilter = React.createClass({
    render: function() {
        return (
            <div className='bugFilter'>
                <h3>bug filter</h3>
            </div>
        );
    }
});

var BugTable = React.createClass({
    render: function() {
        var list = this.props.bugs.map(function(item) {
            return (
                <BugRow 
                    key={item._id}
                    bug={item}
                />
            );
        })
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
        this.setState({owner: '', title: ''})
    },
    render: function() {
        return (
            <div className='bugAdd'>
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

ReactDOM.render(
    <BugList source='api/bugs'/>, 
    document.getElementById('main')
);
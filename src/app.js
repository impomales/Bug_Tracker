var bugs = [
    {id: 1, status: 'open', priority: 'p1', owner: 'Isaias', title: 'App crashes on open'},
    {id: 2, status: 'closed', priority: 'p2', owner: 'Mark', title: 'Infinite loop'}
];

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
                    key={item.id}
                    id={item.id}
                    status={item.status}
                    priority={item.priority}
                    owner={item.owner}
                    title={item.title}
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
                <td>{this.props.id}</td>
                <td>{this.props.status}</td>
                <td>{this.props.priority}</td>
                <td>{this.props.owner}</td>
                <td>{this.props.title}</td>
           </tr>
        );
   } 
});

var BugAdd = React.createClass({
    render: function() {
        return (
            <div className='bugAdd'>
                <h3>bugAdd</h3>
            </div>
        );
    }
});

var BugList = React.createClass({
    render: function() {
        return (
            <div className='bugList'>
                <h1>Bug Tracker</h1>
                <BugFilter />
                <BugTable bugs={this.props.bugs}/>
                <BugAdd />
            </div>
        );
    }
});

ReactDOM.render(
    <BugList bugs={bugs}/>, 
    document.getElementById('main')
);
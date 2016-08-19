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
                        <BugRow 
                            id='1'
                            status='open'
                            priority='p1'
                            owner='Isaias'
                            title='app crashes on open'
                        />
                        <BugRow 
                            id='2'
                            status='closed'
                            priority='p2'
                            owner='Mark'
                            title='infinite loop'
                        />
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
                <BugTable />
                <BugAdd />
            </div>
        );
    }
});

ReactDOM.render(
    <BugList />, 
    document.getElementById('main')
);
var bugs = [{ id: 1, status: 'open', priority: 'p1', owner: 'Isaias', title: 'App crashes on open' }, { id: 2, status: 'closed', priority: 'p2', owner: 'Mark', title: 'Infinite loop' }];

var BugFilter = React.createClass({
    displayName: 'BugFilter',

    render: function () {
        return React.createElement(
            'div',
            { className: 'bugFilter' },
            React.createElement(
                'h3',
                null,
                'bug filter'
            )
        );
    }
});

var BugTable = React.createClass({
    displayName: 'BugTable',

    render: function () {
        var list = this.props.bugs.map(function (item) {
            return React.createElement(BugRow, {
                key: item.id,
                bug: item
            });
        });
        return React.createElement(
            'div',
            { className: 'bugTable' },
            React.createElement(
                'table',
                null,
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            'Id'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Status'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Priority'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Owner'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Title'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    list
                )
            )
        );
    }
});

var BugRow = React.createClass({
    displayName: 'BugRow',

    render: function () {
        return React.createElement(
            'tr',
            { className: 'bugRow' },
            React.createElement(
                'td',
                null,
                this.props.bug.id
            ),
            React.createElement(
                'td',
                null,
                this.props.bug.status
            ),
            React.createElement(
                'td',
                null,
                this.props.bug.priority
            ),
            React.createElement(
                'td',
                null,
                this.props.bug.owner
            ),
            React.createElement(
                'td',
                null,
                this.props.bug.title
            )
        );
    }
});

var BugAdd = React.createClass({
    displayName: 'BugAdd',

    render: function () {
        return React.createElement(
            'div',
            { className: 'bugAdd' },
            React.createElement(
                'h3',
                null,
                'bugAdd'
            )
        );
    }
});

var BugList = React.createClass({
    displayName: 'BugList',

    getInitialState: function () {
        return { bugs: bugs };
    },
    addBug: function () {
        var id = this.state.bugs.length + 1;
        var newBug = { id: id, status: 'new', priority: 'p3', owner: 'Danny', title: 'Warning on console' };
        var bugsMod = this.state.bugs.slice();
        bugsMod.push(newBug);
        this.setState({ bugs: bugsMod });
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'bugList' },
            React.createElement(
                'h1',
                null,
                'Bug Tracker'
            ),
            React.createElement(BugFilter, null),
            React.createElement(BugTable, { bugs: this.state.bugs }),
            React.createElement(BugAdd, null),
            React.createElement(
                'button',
                { onClick: this.addBug },
                'add bug'
            )
        );
    }
});

ReactDOM.render(React.createElement(BugList, { bugs: bugs }), document.getElementById('main'));
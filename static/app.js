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
                id: item.id,
                status: item.status,
                priority: item.priority,
                owner: item.owner,
                title: item.title
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
                this.props.id
            ),
            React.createElement(
                'td',
                null,
                this.props.status
            ),
            React.createElement(
                'td',
                null,
                this.props.priority
            ),
            React.createElement(
                'td',
                null,
                this.props.owner
            ),
            React.createElement(
                'td',
                null,
                this.props.title
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
            React.createElement(BugTable, { bugs: this.props.bugs }),
            React.createElement(BugAdd, null)
        );
    }
});

ReactDOM.render(React.createElement(BugList, { bugs: bugs }), document.getElementById('main'));
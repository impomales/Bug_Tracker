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

    getInitialState: function () {
        return { owner: '', title: '' };
    },
    handleOwnerChange: function (e) {
        this.setState({ owner: e.target.value });
    },
    handleTitleChange: function (e) {
        this.setState({ title: e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        this.props.addBug(this.state.owner, this.state.title);
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'bugAdd' },
            React.createElement(
                'form',
                { name: 'bugAddForm' },
                React.createElement('input', {
                    type: 'text',
                    placeholder: 'owner',
                    value: this.state.owner,
                    onChange: this.handleOwnerChange
                }),
                React.createElement('input', {
                    type: 'text',
                    placeholder: 'title',
                    value: this.state.title,
                    onChange: this.handleTitleChange
                }),
                React.createElement('input', { className: 'button', type: 'button', value: 'Post', onClick: this.handleSubmit })
            )
        );
    }
});

var BugList = React.createClass({
    displayName: 'BugList',

    getInitialState: function () {
        return { bugs: bugs };
    },
    addBug: function (owner, title) {
        var id = this.state.bugs.length + 1;
        var newBug = { id: id, status: 'new', priority: 'p' + id, owner: owner, title: title };
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
            React.createElement(BugAdd, { addBug: this.addBug })
        );
    }
});

ReactDOM.render(React.createElement(BugList, { bugs: bugs }), document.getElementById('main'));
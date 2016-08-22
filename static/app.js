var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

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
                key: item._id,
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
                this.props.bug._id
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
        this.setState({ owner: '', title: '' });
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
        return { bugs: [] };
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.source,
            success: function (data) {
                this.setState({ bugs: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    addBug: function (owner, title) {
        var id = this.state.bugs.length + 1;
        var newBug = { id: id, status: 'new', priority: 'p1', owner: owner, title: title };
        $.ajax({
            url: this.props.source,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newBug),
            success: function (data) {
                var bugsMod = this.state.bugs.concat(data);
                this.setState({ bugs: bugsMod });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
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

ReactDOM.render(React.createElement(BugList, { source: 'api/bugs' }), document.getElementById('main'));
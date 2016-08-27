var React = require('react');
var Panel = require('react-bootstrap/lib/Panel');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');

var BugFilter = React.createClass({
    getInitialState: function() {
        var initFilter = this.props.initFilter;
        return {priority: initFilter.priority, status: initFilter.status}
    },
    componentWillReceiveProps: function(newProps) {
        if (newProps.initFilter.priority === this.state.priority &&
            newProps.initFilter.status === this.state.status) return;
        else this.setState({priority: newProps.initFilter.priority, status: newProps.initFilter.status});
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
            <Panel collapsible defaultExpanded={true} header="Filter">
                <form>
                    <Col xs={12} sm={12} md={6}>
                        <FormGroup>
                            <ControlLabel>Priority</ControlLabel>
                            <FormControl componentClass='select' value={this.state.priority} onChange={this.handlePriorityChange}>
                                <option value=''>(Any)</option>
                                <option value='p1'>p1</option>
                                <option value='p2'>p2</option>
                                <option value='p3'>p3</option>
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                        <FormGroup>
                            <ControlLabel>Status</ControlLabel>
                            <FormControl componentClass='select' value={this.state.status} onChange={this.handleStatusChange}>
                                <option value=''>(Any)</option>
                                <option value='new'>new</option>
                                <option value='open'>open</option>
                                <option value='closed'>closed</option>
                                <option value='fixed'>fixed</option>
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                        <FormGroup>
                            <Button bsStyle='primary' onClick={this.handleClick}>Filter</Button>
                        </FormGroup>
                    </Col>
                </form>
            </Panel>
        );
    }
});

module.exports = BugFilter;
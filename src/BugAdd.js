var React = require('react');
var Panel = require('react-bootstrap/lib/Panel');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');

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
            <Panel header="Add a Bug">
                <form>
                    <Col xs={12} sm={12} md={6}>
                        <FormGroup>
                            <ControlLabel>Owner</ControlLabel>
                            <FormControl 
                                type='text'
                                value={this.state.owner}
                                onChange={this.handleOwnerChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                        <FormGroup>
                            <ControlLabel>Title</ControlLabel>
                            <FormControl 
                                type='text'
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                        <Button onClick={this.handleSubmit} bsStyle='primary'>Add</Button>
                    </Col>
                </form>
            </Panel>
        );
    }
});

module.exports = BugAdd;
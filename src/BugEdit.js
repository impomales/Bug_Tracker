var React = require('react');
var Link = require('react-router').Link;
var Panel = require('react-bootstrap/lib/Panel');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');
var Alert = require('react-bootstrap/lib/Alert');
var $ = require('jquery');

var BugEdit = React.createClass({
    getInitialState: function() {
        return {successVisible: false};
    },
    componentDidMount: function() {
        this.loadData();
    },
    componentDidUpdate: function(prevProps) {
        if (this.props.params.id != prevProps.params.id) this.loadData();
    },
    loadData: function() {
        $.ajax('/api/bugs/' + this.props.params.id).done(function(bug) {
            this.setState(bug);
        }.bind(this));
    },
    handlePriorityChange: function(e) {
        this.setState({priority: e.target.value})
    },
    handleStatusChange: function(e) {
        this.setState({status: e.target.value})
    },
    handleOwnerChange: function(e) {
        this.setState({owner: e.target.value})
    },
    handleTitleChange: function(e) {
        this.setState({title: e.target.value})
    }, 
    handleSubmit: function(e) {
        e.preventDefault();
        var bug = {
            status: this.state.status,
            priority: this.state.priority,
            owner: this.state.owner,
            title: this.state.title
        }
        
        $.ajax({
            url: '/api/bugs/' + this.props.params.id, type: 'PUT', contentType: 'application/json',
            data: JSON.stringify(bug),
            dataType: 'json',
            success: function(bug) {
                this.setState(bug);
                this.showSuccess();
            }.bind(this),
        })
    },
    showSuccess: function() {
        this.setState({successVisible: true});
    },
    dismissSuccess: function() {
        this.setState({successVisible: false})
    },
    render: function() {
        var success = (
            <Alert bsStyle='success' onDismiss={this.dismissSuccess}>
                Bug saved successfully.
            </Alert>    
        );
        return (
            <div className='bugEdit' style={{maxWidth: 600}}>
                <Panel header={'Edit bug: ' +  this.props.params.id}>
                    <form className='bugEditForm'>
                        <Col xs={12} sm={6} md={3}>
                            <FormGroup>
                                <ControlLabel>Priority:</ControlLabel>
                                <FormControl componentClass='select' value={this.state.priority} onChange={this.handlePriorityChange}>
                                    <option value='p1'>p1</option>
                                    <option value='p2'>p2</option>
                                    <option value='p3'>p3</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <FormGroup>
                                <ControlLabel>Status:</ControlLabel>
                                <FormControl componentClass='select' value={this.state.status} onChange={this.handleStatusChange}>
                                    <option value='open'>open</option>
                                    <option value='closed'>closed</option>
                                    <option value='new'>new</option>
                                    <option value='fixed'>fixed</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <FormGroup>
                                <ControlLabel>Owner:</ControlLabel>
                                    <FormControl 
                                        type='text' 
                                        value={this.state.owner || ''} 
                                        onChange={this.handleOwnerChange} 
                                    />
                            </FormGroup>
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <FormGroup>
                                <ControlLabel>Title:</ControlLabel>
                                <FormControl 
                                    type='text' 
                                    value={this.state.title || ''} 
                                    onChange={this.handleTitleChange} 
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <ButtonToolbar>
                                <Button type='submit' bsStyle='primary' onClick={this.handleSubmit}>Submit</Button>
                                <Link className='btn btn-link' to='/bugs'>Back to Bug List</Link>
                            </ButtonToolbar>
                        </Col>
                    </form>
                </Panel>
                {this.state.successVisible ? success : null}
            </div>
        );
    }
});

module.exports = BugEdit;
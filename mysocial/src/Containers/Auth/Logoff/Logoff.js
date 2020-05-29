import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions';

class logoff extends Component {
    componentDidMount() {
        this.props.logout()
    }
    render() {
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps) (logoff);
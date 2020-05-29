import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationItems from '../NavigationItems/NavigationItems';

class Layout extends Component {
render() {
    return (
        <React.Fragment>
            <NavigationItems isAuth={this.props.isAuthenticated}/>
                <main>
                    {this.props.children}
                </main>
            </React.Fragment>)
}
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
}

export default connect(mapStateToProps) (Layout);
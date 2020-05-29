import React, { Component } from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';

class Layout extends Component {
render() {
    return (
        <React.Fragment>
        <NavigationItems />
        <main>
        {this.props.children}
        </main>
        </React.Fragment>)
}
}

export default Layout;
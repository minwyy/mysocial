import React, { Component } from 'react';


class Layout extends Component {
render() {
    return (
        <React.Fragment>
        <h1>Laaayoouut</h1>
        <main>
        {this.props.children}
        </main>
        </React.Fragment>)
}
}

export default Layout;
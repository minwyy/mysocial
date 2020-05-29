import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './Components/Layout/Layout';
import Review from './Containers/Review/Review';
import HomeEntry from './Containers/HomeEntry/HomeEntry';
import Auth from './Containers/Auth/Auth';
import Logoff from './Containers/Auth/Logoff/Logoff';



class App extends Component {

  
  render() {
    let routes = (   
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={HomeEntry} />
        <Redirect to="/" />
      </Switch>);
    // console.log(this.props.isAuthenticated)

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/review" component={Review} />
          <Route path="/logoff" component={Logoff} />
          <Route path="/" exact component={HomeEntry} />
          <Redirect to="/" />
       </Switch>);
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>  
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

export default withRouter(connect(mapStateToProps)(App));

import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './App.css';

import Layout from './Components/Layout/Layout';
import Review from './Containers/Review/Review';
import HomeEntry from './Containers/HomeEntry/HomeEntry';



class App extends Component {

  
  render() {
    const routes = (   
      <Switch>
        <Route path="/review" component={Review} />
        <Route path="/" exact component={HomeEntry} />
        <Redirect to="/" />
      </Switch>);
    return (
      <div>
        <Layout>
          {routes}
        </Layout>  
      </div>
    )
  }
}

export default withRouter(App);

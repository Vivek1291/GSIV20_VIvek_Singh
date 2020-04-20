import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import { showSearchBarAction, navTitleAction } from 'action/searchAction';

import Header from './component/Common/header';

// store imports
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const HomeLayout = Loadable({
  loader: () => import(/* webpackChunkName: "utility", webpackPreload: true */ './component/Common/home'),
  loading: () => { return '' }
});

const DetailsComponent = Loadable({
  loader: () => import(/* webpackChunkName: "utility", webpackPreload: true */ 'component/detailsComponent'),
  loading: () => { return '' }
});

class Routes extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' render={(props) => {this.props._showSearchBarAction(true); return <HomeLayout key = {new Date()} {...props}/>}} />
            <Route path='/details/:id' render={(props) => {this.props._navTitleAction('Movie Details'); this.props._showSearchBarAction(false); return <DetailsComponent key = {new Date()} {...props}/>}} />
          </Switch>
        </Router>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    _showSearchBarAction: showSearchBarAction,
    _navTitleAction: navTitleAction
  }, dispatch);
}
export default connect(null, mapDispatchToProps)(Routes);
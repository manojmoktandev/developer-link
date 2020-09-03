import React, { Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import CommonRoute from './components/routing/CommonRoute';

import './App.css';

//Redux
import { Provider } from 'react-redux';
import store from './stores/store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route component={CommonRoute} />
            </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;

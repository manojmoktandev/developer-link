import React, { Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import CommonRoute from './components/routing/CommonRoute';

import './App.css';

//Redux
import { Provider } from 'react-redux';
import store from './stores/store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Route component={CommonRoute}/>
          </Fragment>
        </Router>
      </Provider>
  );
};
export default App;

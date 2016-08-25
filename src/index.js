import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import requireAuth from './components/auth/require_authentication';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Forum from './components/forum/forum'
import _404 from './components/404';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const username = localStorage.getItem('username');
if(localStorage.getItem('token') && username) {
    store.dispatch({ type: AUTH_USER, payload: username });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path="/" component={App} >
                <IndexRoute component={Forum}/>
                <Route path="signin" component={Signin}/>
                <Route path="signout" component={Signout}/>
                <Route path="signup" component={Signup}/>
                <Route path="*" components={_404}/>
            </Route>
        </Router>
    </Provider>
    , document.querySelector('.container'));

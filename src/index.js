import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import movieReducer from './store/reducers/movieReducer'
import userReducer from './store/reducers/userReducer'


const rootReducer = combineReducers({movieReducer, userReducer})
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

//---Cash data----
store.subscribe(() => {
  localStorage.setItem('movie_data_*18', JSON.stringify(store.getState().movieReducer));
  localStorage.setItem('movie_user_*18', JSON.stringify(store.getState().userReducer));
})

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root')
);



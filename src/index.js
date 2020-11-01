import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React    from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App      from './App';


import { Provider }  from 'react-redux'
import thunk         from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'

// ---[ Reducers ]---
import movieReducer  from './store/reducers/movieReducer';
import userReducer   from './store/reducers/userReducer';

const rootReducer = combineReducers( { movieReducer, userReducer } )
const store       = createStore( rootReducer,  compose( applyMiddleware(thunk) ) );

ReactDOM.render(<Provider store={store}>
                    <App />
                </Provider>, document.getElementById('root'));



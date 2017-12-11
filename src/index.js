import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// createStore FUNCTION ALLOWS US TO MAKE OUR APPLICATION STORE
// applyMiddleware FUNCTION ALLOWS US TO USE THUNK FOR ASYNCHRONOUS ACTIONS
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// Provider ALLOWS US TO PASS OUR STORE INTO APPLICATION
import {Provider} from 'react-redux';

// WE IMPORT OUR COMBINED REDUCERS 
import rootReducer from './reducers/rootReducer';

// composeWithDevTools ALLOWS US TO EASILY CHECK OUR APP STATE IN BROWSER
import {composeWithDevTools} from 'redux-devtools-extension';

import {BrowserRouter} from 'react-router-dom';

// createStore takes in few arguments 1. REDUCERS 2. MIDDLEWARES - in a case we don't provide initial state to store
const store = createStore(

	rootReducer, 
	composeWithDevTools(applyMiddleware(thunk)) // NOW WE CAN SEE OUR REDUX OPTIONS IN BROWSER

	);


// IN ORDER TO USER react-router WE NEED TO WRAP EVERYTHING IN BrowserRouter
// WE WRAP OUR APP WITH PROVIDER WHICH PASSES THE STORE TO IT
ReactDOM.render(
	<BrowserRouter> 
	<Provider store={store}> 
	<App />
	</Provider>
	</BrowserRouter>
	, document.getElementById('root'));
registerServiceWorker();
import React, { Component } from 'react';
import './App.css';
import {Link,Route} from 'react-router-dom';
// IMPORTING COMPONENTS
import UsersPage from './components/UsersPage';
import UserForm from './components/UserForm';


class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui two item menu">     
        
        <Link className="item" to="/users"> Users </Link>
        <Link className="item" to="/users/new"> Add new User </Link>
        </div>
        
        <Route path ="/users" component ={UsersPage}/>
        <Route path ="/users/new" component ={UserForm}/>
        <Route path ="/user/:_id" component ={UserForm}/>
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
// WE NEED THIS TO CONNECT COMPONENT WITH REDUX
import {connect} from 'react-redux';

// IMPORTING COMPONENT USERLIST WHICH WILL DISPLAY OUR USERS
import UsersList from './UsersList';
import PropTypes from 'prop-types';

// IMPORTING ACTIONS
import {fetchUsers,deleteUser} from '../actions/actions';

class UsersPage extends Component{

	// CALLING FUNCTION TO FETCH USERS
	componentDidMount(){
		this.props.fetchUsers();
	}
	render(){
		// HERE WE CALL UsersList component and pass props to it
		return(
			<div>
			<h1>LIST OF USERS</h1>
			
			<UsersList users={this.props.users} deleteUser={this.props.deleteUser}/>
			</div>
			);
	}
}


// EVERY TIME WE USE NEW PROP WE NEED TO DEFINE IT HERE
UsersPage.propTypes={
	users: PropTypes.array,
	fetchUsers: PropTypes.func,
	deleteUser:PropTypes.func
}


// TAKE A PIECE OF STORE AND PASS IT INTO COMPONENT AS PROP
// TAKES state as argument
function mapStateToProps(state){
	// WE RETURN OBJECT USERS from our store
	return{
		users: state.users
	}
}
// HERE WE CONNECT COMPONENT WITH REDUX AND PASS THE STORE TO IT AND FUNCTIONS
export default connect(mapStateToProps,{fetchUsers,deleteUser})(UsersPage);
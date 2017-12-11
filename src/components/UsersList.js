import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';

// TAKE IN PROPS 
export default function UsersList({users, deleteUser}){

	// THIS IS JUST A MESSAGE WHICH WE DISPLAY IF THERE ARE NO USERS IN DATABASE
	const emptyMessage = (<p>There are currently no users subscribed to your mailing list...maybe you should get some better content</p>);


	
// HERE WE ITERATE THROUGH COLLECTION AND RENDER EACH USER//
	const userList = (
		//ITERATE THROUGH USERS AND FOR EACH USER RETURN USERCARD WITH THESE PROPS
		<div className ="ui four cards">
			{users.map(user => <UserCard user={user} key={user._id} deleteUser={deleteUser}/>)}
		</div>


	);
	// IF OUR USERS COLLECTION IS EMPTY WE RENDER emptyMessage OTHERWISE WE RENDER userList
	return (
	<div>
	
	{users.length === 0 ? emptyMessage : userList }
	</div>
	);
}


// WE NEED TO DEFINE PROPTYPES SINCE WE ARE USING PROPS
UsersList.propTypes = {
	users: PropTypes.array,
	deleteUser:PropTypes.func
}
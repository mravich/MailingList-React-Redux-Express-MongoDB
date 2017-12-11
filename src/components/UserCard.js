import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'; 

export default function UserCard({user,deleteUser}){
	return (

		<div className="ui card">
			<div className="content">

			<div className="header">{user.first}</div>
			<div className="header">{user.last}</div>
			<div className="header">{user.email}</div>

			</div>
			<div className="extra content">
				<div className="ui two buttons">
				<Link to={`/user/${user._id}`} className="ui basic button green">Edit</Link>
				<div className="ui basic button red" onClick={() => deleteUser(user._id)}>Delete</div>
				</div>
			</div>
		</div>

		);
}

UserCard.propTypes = {
	user: PropTypes.object,
	deleteUser:PropTypes.func

}
export const SET_USERS = 'SET_USERS';
export const ADD_USER = 'ADD_USER';
// ALL FETCH PARTS ARE FOR EDITING USERS BUT I DIDN'T MANAGE TO GET IT WOKRING 
export const USER_FETCHED = 'USER_FETCHED';
export const USER_DELETED = 'USER_DELETED';
export const USER_UPDATED = 'USER_UPDATED';



// TAKES IN RESPONSE ARGUMENT
function handleResponse(response){
	// 200-smth
	if(response.ok){
		// CONVERT TO JSON AND RETURN PROMISE
		return response.json();
	}else{
		// IF ERROR MAKE NEW ERROR OBJECT and pass RESPONSE TEXT
		let error = new Error(response.statusText);
		// ADD RESPONSE TO OBJECT
		error.response = response;
		// THROW ERRROR
		throw error;
	}
}
// ACTION CREATOR
export function setUsers(users){
	// WE RETURN OBJECT OF TYPE AND COLLECTION
	return {
		type : SET_USERS,
		users
	}
}

// ACTION CREATOR 
export function addUser(user){
	return {
		type: ADD_USER,
		user
	}
}


export function userFetched(user){
	return{
		type: USER_FETCHED,
		user
	}
}

// WE EXPORT FUNCTION fetchUsers and in it we return another function which takes dispatch as an argument
export function fetchUsers(){
	return dispatch =>{
		// HERE WE MAKE A REQUEST AND RETURN PROMISE (we could use axios here)
		fetch('/api/users') // THIS RETURNS PROMISE
		.then(res =>res.json()) // WE CONVERT RESPONSE TO JSON AND PASS IT FURTHER(we could do status check here)
		.then(data => dispatch(setUsers(data.users))); // WE DISPATCH setUsers action and pass users collection to it
	}
}

// TAKES ID ARGUMENT
export function fetchUser(id) {
  return dispatch => {
    fetch(`/api/users/${id}`)
      .then(res => res.json())
      .then(data => dispatch(userFetched(data.user)));
  }
}

// TAKES DATA AND SINCE ITS A THUNK ACTION IT RETURNS ANOTHER FUNCTION
export function saveUser(data){
	// TAKES IN DISPATCH
	return dispatch =>{
		// WE MAKE POST REQUEST WITH FETCH - we provide second argument which is object 
		return fetch('/api/users',{
			method : 'post',
			//BODY SENT TO SERVER NEEDS TO BE STRING
			body: JSON.stringify(data),
			// WHEN USING FETCH since we are making json request we need to set content-type
			headers :{
				"Content-Type" : "application/json"
			}
		}).then(handleResponse) 
		// HERE WE DISPATCH PURE ACTION
		.then(data=>dispatch(addUser(data.user)));
	}
}

export function userDeleted(userId){
	return {
		type: USER_DELETED,
		userId
	}
}


// TAKES ONLY USER ID
export function deleteUser(id) {
  return dispatch => {
  	// USE ID IN URL REQUEST
    return fetch(`/api/users/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    // DISPATCH ACTION
    .then(data => dispatch(userDeleted(id)));
  }
}

export function userUpdated(user){
	return {
		type: USER_UPDATED,
		user
	}
}

// TAKES DATA AND SINCE ITS A THUNK ACTION IT RETURNS ANOTHER FUNCTION
export function updateUser(data){
	// TAKES IN DISPATCH
	return dispatch =>{
		// WE MAKE POST REQUEST WITH FETCH - we provide second argument which is object 
		return fetch(`/api/users/${data._id}`,{
			method : 'put',
			//BODY SENT TO SERVER NEEDS TO BE STRING
			body: JSON.stringify(data),
			// WHEN USING FETCH since we are making json request we need to set content-type
			headers :{
				"Content-Type" : "application/json"
			}
		}).then(handleResponse) 
		// HERE WE DISPATCH PURE ACTION
		.then(data=>dispatch(userUpdated(data.user)));
	}
}

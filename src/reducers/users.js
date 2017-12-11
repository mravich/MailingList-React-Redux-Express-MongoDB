import {SET_USERS, ADD_USER, USER_FETCHED,USER_DELETED, USER_UPDATED} from '../actions/actions';

// Reducers are pure functions that take two arguments STATE and ACTION 
// Here we set state to empty array by default and actions to empty object by default
export default function users(state=[], action = {}){
	// SWITCH 
	switch(action.type){
		case ADD_USER:
		// RETURN NEW ARRAY WHICH CONTAINS ALL ITEMS FROM CURRENT STATE AND ADDS NEW OBJECT 
			return [
			...state,
			action.user
			];
			

		// IN THIS CASE WE WANT TO REWRITE USERS COLLECTION SO WE RETURN THE COLLECTION RECEIVED
		case SET_USERS:
			return action.users;

		// DELETE USER CASE
		case USER_DELETED:
		// HERE WE CREATE ARRAY WITHOUT USER WITH THIS ID - we use filter 
		return state.filter(item => item._id !== action.userId);

		
		case USER_FETCHED:
		// SEARCH FOR USER IN STATE BY ID
			const index = state.findIndex(item =>item._id === action.user._id);
			// IF THIS IS GREATER THEN -1 MEANS THAT USER WAS FOUND IN ARRAY
			if(index >-1){
				// ITERATE TROUGH ARRAY
				return state.map(item=>{
					// FOR ELEMENT WITH SAME ID WE RETURN USER
					if(item._id === action.user._id) return action.user;
					// FOR OTHERS WE RETURN ITEM
					return item;
				});
			// IF NO SUCH USER WAS FOUND WE ADD IT TO BOTTOM OF OUR COLLECTION
			}else{
				return[
				...state,
					action.user
					];		
			}

			case USER_UPDATED :
			// HERE WE RETURN NEW ARRAY WITH MAP
				return state.map(item =>{
					if(item._id === action.user._id) return action.user;
					return item;
				});






		// DEFAULT RETURNS EMPTY ARRAY
		default : return state;
	}
}
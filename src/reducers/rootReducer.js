// combineReducers FUNCTION ALLOWS US TO COMBINE ANY NUMBER OF REDUCERS AND STORE THEM INTO ONE OBJECT
import {combineReducers} from 'redux';

// WE IMPORT OUR users REDUCER FROM reducers FOLDER
import users from './users';

// CAN'T USE IT IF YOU DON'T EXPORT IT
export default combineReducers({		
		users
});

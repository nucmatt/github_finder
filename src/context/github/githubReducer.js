import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER,
	GET_REPOS,
} from '../types';

export default (state, action) => {
    // standard JS switch statement
    switch(action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                // the payload is in the action parameter of SEARCH_USERS, so we set the users state to the action's payload, i.e. data. And once this completes we can set state's loading value back to false. That way there is no need to make another call to SET_LOADING to change that state value separately.
                users: action.payload,
                loading: false
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false
            };
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false
            }
        case SET_LOADING:
            // Since state is immutable, we must return the entire state back out of the reducer, only updating state with changes we want to make (i.e. no additons or subtractions from state). So we use the spread operator to copy all the state values into the return, and the action parameter sets a new value for whichever piece of state is being updated by the call to the reducer.
            return {
                ...state,
                loading: true
            }
        // If there is no action, the state AS IS is returned out of the reducer. No changes are made to state.
        default: 
        return state;
    }
}

import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER,
	GET_REPOS,
} from '../types';

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search Users
	const searchUsers = async (text) => {
		// console.log(text);
		// this.setState({ loading: true });
		setLoading();

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		// setUsers(res.data.items);
		// setUsers is replaced with a dispatch to the reducer. Here we use the type (always required) and a payload since we are sending actual fetched data.
		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items,
		});
		// There is no need to send another call to setLoading, i.e. SET_LOADING, in the reducer.
		// setLoading(false);
	};

	// Get User

	// Get Repos

	// Clear Users

	// Set Loading
	// dispatch, from useReducer hook, sends to the githubReducer.js. It must send a type and can send a payload if there is any data necessary. Here we just send the type. The functionality for SET_LOADING is in githubReducer.
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
                loading: state.loading,
                searchUsers
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;

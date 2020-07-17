// import React, { Fragment, useState } from 'react';
// useState (and now Fragment) is no longer needed since all state is handled within the reducers of the Context API now.
import React from 'react';
// installed React Router DOM via npm command npm i react-router-dom
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
// Users component moved to Home component
// import Users from './components/users/Users';
import User from './components/users/User';
// Search component is moved the Home component
// import Search from './components/users/Search';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
// import axios from 'axios';

import GithubState from './context/github/GithubState';
// Bring alertState.js same as githubState for the Github context. Below is the Alert.provider needed to utilize the alert context.
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {
	// Note how the useState variables map directly to the state object properties used before refactoring, i.e. empty arrays/object, bool, null.
	// state = {
	// 	users: [],
	// 	user: {},
	// 	repos: [],
	// 	loading: false,
	// 	alert: null,
	// };
	// The goal of using the Context API is to remove all the state from App.js and into the context so each of these will be removed in turn as the refactoring continues.
	// const [users, setUsers] = useState([]);
	// const [user, setUser] = useState({});
	// const [repos, setRepos] = useState([]);
	// const [loading, setLoading] = useState(false);
	// const [alert, setAlert] = useState(null);

	// This is replaced by the search functionality so we don't want the first 30 users showing up every time.
	// componentDidMount is known as a lifecycle method. render is a lifecycle method as well and is the only one that is required.
	// async componentDidMount() {
	// 	this.setState({ loading: true });
	// 	// Registerd for OAUTH app with github. client id and secret are login credentials. You can find them in the .env.local file, where they are set as the variables shown in the template literals. NOTE: .env.local (local environment) files are in the gitignore file so they are not copied to github so it can contain info that you don't want publicly available.
	// 	// console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
	// 	const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

	// 	this.setState({ users: res.data, loading: false });
	// 	// console.log(res.data);
	// }

	// Search Github users. The syntax for the search API is found in the Github developer documentation found here: https://developer.github.com/v3/search/

	// Get single user
	// Removed to githugState.js for Context API refactoring.
	// const getUser = async (login) => {
	// 	// this.setState({ loading: true });
	// 	setLoading(true);

	// 	const res = await axios.get(
	// 		`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);

	// 	// this.setState({ user: res.data, loading: false });
	// 	setUser(res.data);
	// 	setLoading(false);
	// };

	// Get user's repos
	// const getUserRepos = async (login) => {
	// 	// this.setState({ loading: true });
	// 	setLoading(true);

	// 	// per_page and sort are part of the Github api.
	// 	const res = await axios.get(
	// 		`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);

	// 	// this.setState({ repos: res.data, loading: false });
	// 	setRepos(res.data);
	// 	setLoading(false);
	// };

	// Clear users from state is no longer needed as it has be moved to the reducer.
	// const clearUsers = () => {
	// 	setUsers([]);
	// 	setLoading(false);
	// };

	// Alerts for errors
	// Note the change for this function from setAlert to showAlert. You obviously can't have two functions of the same name trying to call each other.
	// const showAlert = (msg, type) => {
	// 	// this.setState({ alert: { msg, type } });
	// 	setAlert({ msg, type });

	// 	// setTimeout(() => this.setState({ alert: null }), 5000);
	// 	setTimeout(() => setAlert(null), 5000);
	// };

	// Note again there is no render() method and no need to destructure state to this.state variables since there is no state object! Also Note that all the this.'s are removes below since you are no longer using a class based component. That also means no having to bind the 'this' keyword from the window object to the class methods.
	return (
		<GithubState>
			<AlertState>
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						{/* The alert prop is no longer needed as it is handled within the alert context now. This again shows how the Context API eliminates the 'prop drilling' scenarios. We no longer need to pass props up and down component chains. <Alert alert={alert} /> */}
						<Alert />
						<Switch>
							<Route
								exact
								path='/'
								component={Home}
								// this entire render is no longer needed with the Home component. Simply set the component attribute to Home as above.
								// render={(props) => (
								// 	<Fragment>
								// 		<Search
								// 			// searchUsers, clearUsers, and showClear is moved to the reducer so it is no longer passed to the Search component as a prop. showAlert is going to be changed later.
								// 			// searchUsers={searchUsers}
								// 			// clearUsers={clearUsers}
								// 			// showClear={users.length > 0 ? true : false}
								// 			// setAlert={showAlert}
								// 		/>
								// 		{/* The Users component has had the loading and users props moved to the app level state with the Context API. This call is now made within the Users component itself. <Users loading={loading} users={users}/> */}
								// 		<Users />
								// 	</Fragment>
								// )}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								component={User}
								// With everything removed to the reducer, you no longer even need props for the User component, you can simply set the Route's compenent attribute to the User component, as above.
								// render={(props) => (
								// 	<User
								// 		// Rest operator in action!
								// 		{...props}
								// 		// These are successively removed as props since they are not handled within the Context API.
								// 		// getUser={getUser}
								// 		// getUserRepos={getUserRepos}
								// 		// user={user}
								// 		// repos={repos}
								// 		// loading={loading}
								// 	/>
								// )}
							/>
							<Route component={NotFound} />
						</Switch>
					</div>
				</div>
			</Router>
			</AlertState>
		</GithubState>
	);
};

export default App;

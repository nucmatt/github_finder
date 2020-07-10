import React, { Fragment, Component } from 'react';
// installed React Router DOM via npm command npm i react-router-dom
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null,
	};

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
	searchUsers = async (text) => {
		// console.log(text);
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({ users: res.data.items, loading: false });
	};

	// Get single user
	getUser = async (login) => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({ user: res.data, loading: false });
	};

	// Get user's repos
	getUserRepos = async login => {
		this.setState({ loading: true });

		// per_page and sort are part of the Github api.
		const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

		this.setState({ repos: res.data, loading: false });
	}

	// Clear users from state
	clearUsers = () => this.setState({ users: [], loading: false });

	// Alerts for errors
	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		setTimeout(() => this.setState({ alert: null }), 5000);
	};

	render() {
		// Destructuring assignment to clean up the return a bit. Remember that with destructuring when you write any of the const names it will be interpreted as this.state.users, this.state.loading, etc. Note you can still call properties of these values such as users.length and it will be interpreted as this.state.users.length.
		const { users, user, repos, loading } = this.state;

		return (
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Fragment>
										{/* Add the properties used in Search.js here to the App.js when Search.js is called to "catch" the properties hoisted up from Search to App. */}
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={this.setAlert}
										/>
										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={(props) => (
									<User
										// Rest operator in action!
										{...props}
										getUser={this.getUser}
										getUserRepos={this.getUserRepos}
										user={user}
										repos={repos}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;

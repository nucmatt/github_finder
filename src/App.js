import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';

class App extends Component {
	state = {
		users: [],
		loading: false,
	};
	// componentDidMount is known as a lifecycle method. render is a lifecycle method as well and is the only one that is required.
	async componentDidMount() {
		this.setState({ loading: true });
		// Registerd for OAUTH app with github. client id and secret are login credentials. You can find them in the .env.local file, where they are set as the variables shown in the template literals. NOTE: .env.local (local environment) files are in the gitignore file so they are not copied to github so it can contain info that you don't want publicly available.
		// console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
		const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

		this.setState({ users: res.data, loading: false });
		// console.log(res.data);
	}
	render() {
		return (
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Search />
					<Users loading={this.state.loading} users={this.state.users} />
				</div>
			</div>
		);
	}
}

export default App;

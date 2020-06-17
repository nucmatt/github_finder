import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
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

		const res = await axios.get('https://api.github.com/users');

		this.setState({ users: res.data, loading: false });
		// console.log(res.data);
	}
	render() {
		return (
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Users loading={this.state.loading} users={this.state.users} />
				</div>
			</div>
		);
	}
}

export default App;

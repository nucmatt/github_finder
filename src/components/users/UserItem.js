import React, { Component } from 'react';

class UserItem extends Component {
	// Generally constructors are not used for state UNLESS you have another reason to be creating a constructor. For state only, just use the variable name state as below.
	// constructor() {
	// 	// Must call the function super() to call the parent class constructor
	// 	super();
	// 	// State is really just a JS object
	// 	this.state = {
	// 		id: 'id',
	// 		login: 'mojombo',
	// 		avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
	// 		html_url: 'https://github.com/mojombo',
	// 	};
	// }

	state = {
		id: 'id',
		login: 'mojombo',
		avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
		html_url: 'https://github.com/mojombo',
	};

	render() {
		// this const is a destructuring statement used so that you don't have to type this.state.login and then this.state.avatar_url and so forth, you can simple type the state property name you want.
		const { login, avatar_url, html_url } = this.state;
		return (
			<div className='card text-center'>
				<img
					src={avatar_url}
					alt=''
					className='round-img'
					// inline styles like this must be enclosed in double curly braces, properties must be typed in camelCase, and property values must be enclosed as strings.
					style={{ width: '60px' }}
				/>
				<h3>{login}</h3>

				<div>
					<a href={html_url} className="btn btn-dark btn-sm my-1">More</a>
				</div>
			</div>
		);
	}
}

export default UserItem;

import React from 'react';
import PropTypes from 'prop-types'

// Here we extend simply move the destructuring of properties (to minimize code written within the component) into the definition of the stateless functional component by replacing the props keyword with the actual user property destructuring. Remember that if this destructuring is not used every place you use the property you have to write props.user.avatar_url etc.
const UserItem = ({ user: { login, avatar_url, html_url } }) => {
	// const { login, avatar_url, html_url } = props.user;

	return (
		<div className='card text-center'>
			<img
				src={avatar_url}
				alt=''
				className='round-img'
				style={{ width: '60px ' }}
			/>
			<h3>{login}</h3>

			<div>
				<a href={html_url} className='btn btn-dark btn-sm my-1'>
					More
				</a>
			</div>
		</div>
	);
};

// Since user has many properties, you can make the user property required as an object. This doesn't make the properties WITHIN user required but makes a user property object required. 
UserItem.propTypes = {
	user: PropTypes.object.isRequired,
}
// Below is considered a stateless component. It is refactored (above) into a stateless functional component since it has no state that needs to be maintained.
// import React, { Component } from 'react';
// class UserItem extends Component {
// Generally constructors are not used for state UNLESS you have another reason to be creating a constructor. For state only, just use the variable name state as below.
// constructor() {
// 	// Must call the function super() to call the parent class constructor
// 	super();
// 	// State is really just a property of the component. It MUST be set to a JS object.
// 	this.state = {
// 		id: 'id',
// 		login: 'mojombo',
// 		avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
// 		html_url: 'https://github.com/mojombo',
// 	};
// }

// Now that we are passing the UserItem component into the Users component, we no longer need state. Instead we use the UserItem props(properties) to pass in to the Users state for updating and display.
// state = {
// 	id: 'id',
// 	login: 'mojombo',
// 	avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
// 	html_url: 'https://github.com/mojombo',
// };

// 	render() {
// 		// this const is a destructuring statement used so that you don't have to type this.state.login and then this.state.avatar_url and so forth, you can simple type the state property name you want.
// 		// const { login, avatar_url, html_url } = this.state;
// 		// Refactored to use the Users component. Now we are passing properties into the Users component from here, UserItem. Now every user pulled in from the API will create a UserItem component that is then placed within the Users parent component and from there, all users are placed within the App component to be rendered to the DOM.
// 		const { login, avatar_url, html_url } = this.props.user;
// 		return (
// 			<div className='card text-center'>
// 				<img
// 					src={avatar_url}
// 					alt=''
// 					className='round-img'
// 					// inline styles like this must be enclosed in double curly braces, properties must be typed in camelCase, and property values must be enclosed as strings.
// 					style={{ width: '60px' }}
// 				/>
// 				<h3>{login}</h3>

// 				<div>
// 					<a href={html_url} className="btn btn-dark btn-sm my-1">More</a>
// 				</div>
// 			</div>
// 		);
// 	}
// }

export default UserItem;

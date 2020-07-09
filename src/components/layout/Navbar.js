import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// More destructuring! Remember that props is implicit within the parentheses that creates the stateless functional component. See UserItem for more destructuring explanation/goodness.
const Navbar = ({ icon, title}) => {
	return (
		<nav className='navbar bg-primary'>
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>
				<li>
					{/* Using <a> tags for our links makes it so that state is cleared from App.js when you use the links. By using <Link> tags from react-router-dom, you can preserve state when navigating between links in the app. */}
					{/* <a href="/">Home</a> */}
					<Link to='/'>Home</Link>
				</li>
				<li>
					{/* <a href="/about">About</a> */}
					<Link to='/about'>About</Link>
				</li>
			</ul>
		</nav>
	);
};

Navbar.defaultProps = {
	title: 'Github Finder',
	icon: 'fab fa-github',
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};
// Below is the code for the Navbar as a stateless component. It is refactored above as a stateless functional component since state is not managed in this component.
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// export class Navbar extends Component {
// 	// Default props can be overidden by adding the property to the component/element as an attribute and specifying the new property value.
// 	static defaultProps = {
// 		title: 'Github Finder',
// 		icon: 'fab fa-github',
// 	};
//     // PropTypes are basically type checking for your properties so that React will ensure the property value is of the type you specify. In this case, title and icon must be strings AND are required to be entered. NOTE: PropTypes must be imported as above to function.
// 	static propTypes = {
// 		title: PropTypes.string.isRequired,
// 		icon: PropTypes.string.isRequired,
// 	};

// 	render() {
// 		return (
// 			<nav className='navbar bg-primary'>
// 				<h1>
// 					<i className={this.props.icon}></i> {this.props.title}
// 				</h1>
// 			</>
// 		);
// 	}
// }

export default Navbar;

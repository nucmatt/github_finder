import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Navbar extends Component {
	// Default props can be overidden by adding the property to the component/element as an attribute and specifying the new property value.
	static defaultProps = {
		title: 'Github Finder',
		icon: 'fab fa-github',
	};
    // PropTypes are basically type checking for your properties so that React will ensure the property value is of the type you specify. In this case, title and icon must be strings AND are required to be entered. NOTE: PropTypes must be imported as above to function.
	static propTypes = {
		title: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
	};

	render() {
		return (
			<nav className='navbar bg-primary'>
				<h1>
					<i className={this.props.icon}></i> {this.props.title}
				</h1>
			</nav>
		);
	}
}

export default Navbar;

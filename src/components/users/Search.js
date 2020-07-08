import React, { Component } from 'react';
import PropTypes from 'prop-types'

export class Search extends Component {
	state = {
		text: '',
    };

    // Be sure to add your prop types to every component that has props. This is basically error checking and will warn you of issues in your code, hopefully before they become an problem.
    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
    }

    // Note that the binding of the this keyword occurs within the render method below. The onChange method below implicitly binds the this keyword because it is an arrow function and that is how React currently handles arrow functions. The third alternative (you can find this in your Dynalist notes under React/JSX/this Keyword and JSX) is to bind explicitly bind the this keyword to the component's local scope within the the constructor.
    onSubmit(e) {
        e.preventDefault();
        // Passing the search text up to App.js as a prop. This keeps all functionality at the top level. Note that this is the reverse of passing props down from the top level into individual components. This passing props up and down can become a hassle in complicated apps. Thus you have tools like Context and Redux to simplify prop management.
        this.props.searchUsers(this.state.text);
        // This simply resets the search from to blank once a search has been submitted and passedup to App.js
        this.setState({ text: ''});
    }
    
    // This is a simple example because it is only one input. It gets more complicated when you have multiple inputs that you want to track in state. Below is the syntax  you can use for multiple inputs.
    // onChange = e => {
    //     this.setState({ text: e.target.value });
    // }

    // By using [e.target.name] you can have one onChange method that will target each input based on it's name value and update the state corresponding to the name. Note that you the input name value must match the state object key and state must hold a separate key for each input you want to track.
    onChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit.bind(this)} className='form'>
					<input
						type='text'
						name='text'
						placeholder='Search Users...'
                        value={this.state.text}
                        onChange={this.onChange}
					/>
					<input
						type='submit'
						value='Search'
						className='btn btn-dark btn-block'
					/>
				</form>
			</div>
		);
	}
}

export default Search;

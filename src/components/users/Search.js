import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Props are passed to functional components as arguments. The curly brace format below destructures the props. This replaces the class-based component's this.props.searchUsers etc.
const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
	// This destructures your state for the useState method. text is what the state value's name, setText is whatever method you want to use to manipulate the state's value. Here the text state is set to a blank value just like before when we used state = { text: '' }.
	const [text, setText] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			setAlert('Please enter something', 'light');
		} else {
			searchUsers(text);
			// This simply resets the search from to blank once a search has been submitted. MUCH simpler than having to call setState again to reset the component state to a blank value.
			setText('');
		}
	};

	// With the class component onChange called setState to update the component state. Now you call setText, the method introduced above when setting the functional component's state via useState.
	const onChange = e => setText(e.target.value);

	// No more wrapping the return in a render function. React Hooks useState in a functional component also clears up the need for binding the this keyword from the window object to the component since there is no more need for this keywords since the component no longs extends a class.
	return (
		<div>
			<form onSubmit={onSubmit} className='form'>
				<input
					type='text'
					name='text'
					placeholder='Search Users...'
					value={text}
					onChange={onChange}
				/>
				<input
					type='submit'
					value='Search'
					className='btn btn-dark btn-block'
				/>
			</form>
			{/* This expression conditionally shows the clear button only if there are users held in state at App.js. The value of showClear is set in App.js as a prop of Search when it is called in App.js. */}
			{showClear && (
				<button className='btn btn-light btn-block' onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

// Proptypes are in this format for functional components.
Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired,
};

export default Search;

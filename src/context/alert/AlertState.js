import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    // Since there is only one state for the alert, you can simply set the initialState equal to null. There's no need for an object containing multiple state properties.
	const initialState = null;

	const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set Alert
    const setAlert = (msg, type) => {
        // setAlert({ msg, type });
        dispatch({
            type: SET_ALERT,
            payload: { msg, type }
        });

        // setTimeout(() => setAlert(null), 5000);
        setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
	};

	return (
		<AlertContext.Provider
			value={{
				alert: state,
                setAlert,
            }}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;

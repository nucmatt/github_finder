import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
    const alertContext = useContext(AlertContext);

    // Just a little destructuring assignment so you don't have to type alertContext.alert over and over in the return statement.
    const { alert } = alertContext;
    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i> {alert.msg}
            </div>
        )
    )
}

export default Alert;


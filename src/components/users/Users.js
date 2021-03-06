import React from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';


// Since Users no longer handles any state, it can be turned in to a functional component. 
const Users = ({ users, loading }) => {
    // state is now handled within the App component. Users are passed in to this Users component as props from App. You will see in the render method below that the map function now uses this.props.users instead of this.state.users.
    // state = {
    //     users: [
    //         {
    //             id: '1',
    //             login: 'mojombo',
    //             avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    //             html_url: 'https://github.com/mojombo'
    //         },
    //         {
    //             id: '2',
    //             login: 'defunkt',
    //             avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',
    //             html_url: 'https://github.com/defunkt'
    //         },
    //         {
    //             id: '3',
    //             login: 'pjhyett',
    //             avatar_url: 'https://avatars0.githubusercontent.com/u/3?v=4',
    //             html_url: 'https://github.com/pjhyett'
    //         }
    //     ]
    // }

        if(loading) {
            return <Spinner />
        } else {
            // the render() method is not used for functional components. The functional component returns the JSX directly.
                // render() {
                    return (
                        <div style={userStyle}>
                            {users.map(user => (
                                <UserItem key={user.id} user={user} />
                            ))}
                        </div>
                    )
                }
        }

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

// This is used to demonstrate that you can use variables to insert styles into your React components in addition to inline styles adn the App.css file. Note the style is an object, camelCase is used for the styles, and the values are enclosed in quotes. All of this is required.
const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users


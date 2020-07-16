import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
// import PropTypes from 'prop-types';
// You can gain access to any of the values within the GithubContext.provider for ANY component by importing GithubContext and then initializing it as below.
import GithubContext from '../../context/github/githubContext';


// Since Users no longer handles any state, it can be turned in to a functional component. And once githubContext is imported we no longer want to bring in users adn loading as props since they have moved to within GithubContext.
// const Users = ({ users, loading }) => {
const Users = () => {
    // We import GithubContext as a capital G, then initialize it in the component with a lower case g. Not sure why that is as of yet. Note that GithubContext and useContext are imported above.
    const githubContext = useContext(GithubContext);

    // This destructures the githubContext.whatever so you don't have to keep repeating githubContext.whatever below. This allows for the code to stay the same below and for cleaner code overall.
    const { loading, users } = githubContext;

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

// propTypes are not needed at all here anymore since users and loading are not coming from props any more, they are coming from context.
// Users.propTypes = {
//     users: PropTypes.array.isRequired,
//     loading: PropTypes.bool.isRequired,
// }

// This is used to demonstrate that you can use variables to insert styles into your React components in addition to inline styles adn the App.css file. Note the style is an object, camelCase is used for the styles, and the values are enclosed in quotes. All of this is required.
const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users


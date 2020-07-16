import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';
import githubContext from '../../context/github/githubContext';

// Here is how I understand what is happening here with the <Route>s and state and prop calls, etc. After the search is completed, you click on the `More` button in the UserItem. The button contains a <Link>. The <Link> calls the <Route> that takes that user's login and calls the getUser method in App.js. The getUser method makes a call to the Github API(via async/await in axios) using the user's login that then fills in the user state in App.js with the user's api information. This user data is then passed in to the <User /> component call in App.js as props.

// All of these props will be removed during the refactoring to use the Context API.
// const User = ({ user, loading, getUser, getUserRepos, repos, match }) => {
const User = ({ getUserRepos, repos, match }) => {
	const githubContext = useContext(GithubContext);

	const { getUser, loading, user } = githubContext;

	// useEffect replaces the lifecycle method componentDidMount here. The effect is still the same, getUser and getUserRepos are not available until AFTER the User component is fully loaded.
	useEffect(() => {
		getUser(match.params.login);
		getUserRepos(match.params.login);
		// You have to add the extra parmater to useEffect ( the , [] ) to mimic the behavior of componentDidMount. useEffect is agnostic on which lifecycle method you want so this extra parameter is necessary. For componentDidMount you leave the brackets empty. Without this parameter, every time getUser or getUserRepos gets new information, the component updates. This constant updating causes a loop that never terminates since both functions are updating information every time they are called.
		// The eslint line below is necessary to prevent a build warning about adding getUser and getUserRepos as dependencies, i.e. adding them to the brackets in the second paramter. Doing that would cause the aforementioned loop so we disable the error warning instead.
		// eslint-disable-next-line
	}, []);
	// Above you are pulling the parameter 'login' from the User properties assigned in App.js when the User component is called. It is found in the <Route> that creates the User.js page at path='user/:login'. I'm not really clear on how this works. NOTE that this may behave differently since conversion to a functional component but I am still unclear on how this params business works.

	const {
		name,
		avatar_url,
		location,
		bio,
		blog,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable,
		company,
	} = user;

	if (loading) return <Spinner />;

	return (
		<Fragment>
			<Link to='/' className='btn btn-light'>
				Back to Search
			</Link>
			Hireable:{' '}
			{hireable ? (
				<i className='fas fa-check text-success' />
			) : (
				<i className='fas fa-times-circle text-danger' />
			)}
			<div className='card grid-2'>
				<div className='all-center'>
					<img
						src={avatar_url}
						className='round-img'
						alt=''
						style={{ width: '150px' }}
					/>
					<h1>{name}</h1>
					<p>Location: {location}</p>
				</div>
				<div>
					{/* These expressions seem to act like if/then statements. I.e. if bio is true, then produce the <Fragment>. */}
					{bio && (
						<Fragment>
							<h3>Bio</h3>
							<p>{bio}</p>
						</Fragment>
					)}
					<a href={html_url} className='btn btn-dark my-1'>
						Visit Github Profile
					</a>
					<ul>
						<li>
							{login && (
								<Fragment>
									<strong>Username: </strong> {login}
								</Fragment>
							)}
						</li>
						<li>
							{company && (
								<Fragment>
									<strong>Company: </strong> {company}
								</Fragment>
							)}
						</li>
						<li>
							{blog && (
								<Fragment>
									<strong>Website: </strong> {blog}
								</Fragment>
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className='card text-center'>
				<div className='badge badge-primary'>Followers: {followers}</div>
				<div className='badge badge-success'>Following: {following}</div>
				<div className='badge badge-light'>Public Repos: {public_repos}</div>
				<div className='badge badge-dark'>Public Gists: {public_gists}</div>
			</div>
			<Repos repos={repos} />
		</Fragment>
	);
};

User.propTypes = {
	// loading: PropTypes.bool,
	// user: PropTypes.object.isRequired,
	repos: PropTypes.array.isRequired,
	// getUser: PropTypes.func.isRequired,
	getUserRepos: PropTypes.func.isRequired,
};

export default User;

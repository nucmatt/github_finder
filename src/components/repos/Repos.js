import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';


export const Repos = ({ repos }) => {
    // Maps through the repo array returned from the Github api and created a RepoItem for each repo. Key is necessary because this is a list and calling each RepoItem requires a unique identifier.
    return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);
}

Repos.propTypes = {
    repos: PropTypes.array.isRequired,
}

export default Repos;

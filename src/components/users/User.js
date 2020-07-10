import React, { Component } from 'react'

// Here is how I understand what is happening here with the <Route>s and state and prop calls, etc. After the search is completed, you click on the `More` button in the UserItem. The button contains a <Link>. The <Link> calls the <Route> that takes that user's login and calls the getUser method in App.js. The getUser method makes a call to the Github API(via async/await in axios) using the user's login that then fills in the user state in App.js with the user's api information. This user data is then passed in to the <User /> component call in App.js as props. 

export class User extends Component {
    componentDidMount() {
        // Here you are pulling the parameter 'login' from the User properties assigned in App.js when the User component is called. It is found in the <Route> that creates the User.js page at path='user/:login'. I'm not really clear on how this works.
        this.props.getUser(this.props.match.params.login)
    }
    render() {
        const {
            name, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable
        } = this.props.user;

        const { loading } = this.props;

        return (
            <div>
                {name}
            </div>
        )
    }
}

export default User

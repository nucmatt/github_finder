import React, { Fragment } from 'react';
import Search from '../users/Search';
import Users from '../users/Users';

export const Home = () => 
// A return statement is not needed since the return is only a single Fragment
        <Fragment>
            <Search />
            <Users />
        </Fragment>

export default Home;

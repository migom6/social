import React from 'react';
import Nav from './Nav';
import Feed from './feed/';
import Right from './right';
import Left from './left';

import "./index.css";

const Home = () =>
    (<div id="home">
        <Nav />
        <div id="main">
            <Left />
            <Feed />
            <Right />
        </div>
    </div>)

export default Home;
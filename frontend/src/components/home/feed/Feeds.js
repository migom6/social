import React from 'react';
import Feed from "./Feed";

const Feeds = () => {
    const feeds = ["hello", "hi", "go"];

    return (<div id="feeds">{feeds.map((value, key) => <Feed key={key} user_name={value} />)}</div>);
}

export default Feeds;
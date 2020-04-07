import React from 'react';
import Event from './Event';

const Events = () => {
    const events = ["event1", "event2", "event3"];
    return (
        <div id="events">
            {events.map((value, index) => <Event key={index} title={value} />)}
        </div>
    )
}

export default Events
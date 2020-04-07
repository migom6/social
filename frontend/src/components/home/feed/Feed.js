import React from 'react';

const Feed = ({ key, user_image, user_name, text, image }) => {
    return (
        <div key={key} className="feed">
            {user_name}
        </div>
    )
}

export default Feed;
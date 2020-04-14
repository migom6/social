import React from "react";

function Feed() {
  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1];
  return (
    <>
      {arr.map((element, key) => {
        return (
          <div key={key} className="feed">
            hello{element}
          </div>
        );
      })}
    </>
  );
}

export default Feed;

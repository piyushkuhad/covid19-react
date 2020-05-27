import React from 'react';

const UpdateTime = ({time}) => {
    console.log(time.toLocaleString());

    return(
        <span className="timeago"></span>
    )
}

export default UpdateTime;
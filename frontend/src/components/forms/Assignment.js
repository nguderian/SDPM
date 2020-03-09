import React from 'react';

const Assignment = ({ match, location }) => {

    const { params: { id } } = match;

    return(
        <h1>{id}</h1>
    );
}

export default Assignment;
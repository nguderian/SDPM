import React from 'react';

const Assignment = ({ match, location }) => {
    const { form } = location.state;
    
    return(
        <div>
            <h1>{form.id}</h1>
            <h2>{form.formTitle}</h2>
        </div>
        
    );
}

export default Assignment;
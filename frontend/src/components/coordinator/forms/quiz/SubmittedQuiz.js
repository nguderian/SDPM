import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import TakeFillBlank from './questions/TakeFillBlank';
// import TakeMultipleChoice from './questions/TakeMultipleChoice';
import Button from '@material-ui/core/Button';
import axios from 'axios';
// import TakeFreeResponse from './questions/TakeFreeResponse';


const SubmittedQuiz = ({ userId, userType, token, loggedIn, location }) => {
    const { instanceId } = location.state;
    console.log(location.state);
    useEffect(() => {
        async function getSubmission() {
            const options = {
                method: 'POST', 
                url: 'http://localhost:3001/api/getInstance', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }, 
                data: {
                    'user_id': userId,
                    'instance_id': instanceId
                }
            };
            console.log(options);
            const result = await axios(options);
            console.log(result);
        }
        getSubmission();
    }, [token, instanceId]);

    return (
        <Fragment>
            <Typography>Header</Typography>
        </Fragment>
        
    );
}

export default SubmittedQuiz;
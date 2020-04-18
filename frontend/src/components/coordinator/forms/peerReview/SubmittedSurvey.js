import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'; 
import Slider from '@material-ui/core/Slider';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    surveyDetail: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    submitButton: {
        textAlign: 'center',
        marginTop: theme.spacing(2)
    },
    prCard: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    prCards: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        margin: '0 auto',
        border: '1px solid gray',
        borderRadius: '5px',
        marginTop: theme.spacing(2),
        flexGrow: 1,
        maxHeight: '70%',
        overflowY: 'scroll'
    },
    slider: {
        width: '60%',
        marginTop: theme.spacing(5),
    },
    progress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '25%'
    },
}));


const SubmittedSurvey = ({ userId, token, location }) => {
    const classes = useStyles();
    const { instanceId } = location.state;

    useEffect(() => {
        async function getInstance() {
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
    
            const result = await axios(options);
            console.log(result);
        }
        getInstance();
    }, [token, instanceId]);

    return (
        <Fragment>
            <h1>Hi</h1>
        </Fragment>
    );
}

export default SubmittedSurvey;
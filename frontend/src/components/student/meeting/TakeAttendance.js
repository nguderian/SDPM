import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    }
}));


const TakeAttendance = ( { userId, userType, token, loggedIn, location }) => {
    const classes = useStyles();
    const { meeting } = location.state;
    return (
        <Fragment>
            <Typography variant="h4" className={classes.pageTitle}>{meeting.title}</Typography>
        </Fragment>
    )
}

export default TakeAttendance;


import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
}));

const ViewAlert = ({ userId, userType, token, loggedIn, location }) => {
    const classes = useStyles();
    const { alert } = location.state;

    return (
        <Fragment>
            <Typography className={classes.pageTitle} variant='h4'>
                {alert.title}
            </Typography>
        </Fragment>
    )
}

export default ViewAlert;
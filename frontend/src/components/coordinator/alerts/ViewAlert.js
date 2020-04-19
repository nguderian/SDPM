import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    grid: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2)
    }, 
    divider: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    root: {
        flexGrow: 1,
    },
    gridItem: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    button: {
        textAlign: 'center',
        marginTop: theme.spacing(2)
    },
    headerText: {
        fontSize: 14
    }
}));

const ViewAlert = ({ token, location }) => {
    const classes = useStyles();
    const { alert } = location.state;
    const history = useHistory();
    
    async function markAlertViewed() {
        const options = {
            method: 'POST',
            url: 'http://localhost:3001/api/setAlertViewed',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                alert_id: alert.alert_id
            }
        }

        let success = true;
        let response = await axios(options);
        
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        if(responseOK) {
            success = success && true;
        }
        else {
            success = success && false;
        }

        history.push('/Home');
    }

    return (
        <Fragment>
            <Typography className={classes.pageTitle} variant='h4'>
                {alert.title}
            </Typography>
            <Divider className={classes.divider} />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Card className={classes.gridItem}>
                            <CardContent>
                                <Typography color='secondary' gutterBottom>
                                    {alert.project_name}
                                </Typography>
                                <Typography color='textPrimary' gutterBottom>
                                    {alert.first_name} {alert.last_name}
                                </Typography>
                                <Typography color='textPrimary' gutterBottom>
                                    {alert.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className={classes.gridItem}>
                            <CardContent>
                                <Typography color='textSecondary' gutterBottom>
                                    Form Type: {alert.type}
                                </Typography>
                                <Typography color='textPrimary' gutterBottom>
                                    {alert.title}
                                </Typography>
                                <Typography color='secondary' gutterBottom>
                                    Grade Recieved: {alert.grade}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            
            <div className={classes.button}>
                <Button 
                    variant='outlined' 
                    color='primary'
                    component={Link}
                    to={{
                        pathname: alert.type === 'quiz' ? `/viewSubmission/Quiz/${alert.title}` : `/viewSubmission/PeerReview/${alert.title}`,
                        state: { instanceId: alert.instance_id }    
                    }}
                >
                    Go to {alert.type}
                </Button>
            </div>
            <div className={classes.button}>
                <Button 
                    variant='outlined'
                    color='secondary'
                    onClick={markAlertViewed}
                >
                    Mark Alert Viewed
                </Button>
            </div>
        </Fragment>
    )
}

ViewAlert.propTypes = {
    token: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
}

export default ViewAlert;
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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

const ViewAlert = ({ location }) => {
    const classes = useStyles();
    const { alert } = location.state;
    console.log(location.state);
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
                        pathname: `/viewSubmission/Quiz/${alert.title}`,
                        state: { instanceId: alert.instance_id }    
                    }}
                >
                    Go to {alert.type}
                </Button>
            </div>
            
        </Fragment>
    )
}

export default ViewAlert;
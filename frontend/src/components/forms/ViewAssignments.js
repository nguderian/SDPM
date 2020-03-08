import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    divider: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }, 
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    root: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
    },
    assignmentCard: {
        margin: theme.spacing(1)
    }
}))


const ViewAssignments = ({ user_id, userType, token, loggedIn }) => {
    const classes = useStyles();
    const [assignments, setAssignments] = useState([
        {
            "formTitle": "Group Peer Review",
            "formId": 1
        },
        {
            "formTitle": "Attendance",
            "formId": 2
        },
        {
            "formTitle": "Quiz 1",
            "formId": 3
        }
    ]);

    return (
        <div>
            <Typography variant="h4" className={classes.pageTitle}>Assignments</Typography>
            <Divider className={classes.divider} variant="fullWidth"/>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {assignments.map((assignment, index) => 
                        <Grid item xs={12} key={index}>
                            <Card className={classes.assignmentCard} variant="outlined">
                                <CardContent>
                                    <Typography>{assignment.formTitle}</Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                    )}
                </Grid>
            </div>
        </div>
        
    );
}

export default ViewAssignments;
import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    detailText: {
        marginLeft: theme.spacing(7),
        marginBottom: theme.spacing(2)
    },
    formList: {
        flexGrow: 1,
        maxHeight: '20%',
        overflowY: 'scroll',
        border: '1px solid gray',
        borderRadius: '5px',
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7), 
        marginBottom: theme.spacing(2)
    },
    formCard: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }, 
}));


const Home = ({ userId, userType, token, loggedIn }) => {
    const classes = useStyles();
    const [studentId, setStudentId] = useState('');
    const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
    const [upcomingMeetings, setUpcomingMeetings] = useState([]);
    const [upcomingPrs, setUpcomingPrs] = useState([]);
    console.log(userId, userType, token);

    // if user is coordinator then we only want to show the alerts on this page
    // but if they're a student then we want to load the studentId to get forms
    useEffect(() => {
        if(userType === 'coordinator') {
            async function getAlerts() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getUserDashboardAlerts',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'user_id': userId,
                    },
                };

                let result = await axios(options);
                console.log(result);
            }
            getAlerts();
        }
        else if(userType === 'student') {
            async function getStudentId() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getAllClasses',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'user_id': userId,
                        'is_active': 1
                    },
                };
    
                let result = await axios(options);
                // console.log(result.data[0].student_id);
                setStudentId(result.data[0].student_id);
            }
            getStudentId();
        }
    }, [token, userId]);

    useEffect(() => {
        if(studentId) {
            async function getUpcomingQuizzes() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getInstances',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'student_id': studentId,
                        'type': 'quiz',
                        'is_complete': 0
                    }
                };
        
                let result = await axios(options);
                console.log(result);
                setUpcomingQuizzes(result.data);
            }
            async function getUpcomingMeetings() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getInstances',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'student_id': studentId,
                        'type': 'meeting',
                        'is_complete': 0
                    }
                };
        
                let result = await axios(options);
                console.log(result);
                setUpcomingMeetings(result.data);
            }
            async function getUpcomingPrs() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getInstances',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'student_id': studentId,
                        'type': 'survey',
                        'is_complete': 0
                    }
                };
        
                let result = await axios(options);
                console.log(result);
                setUpcomingPrs(result.data);
            }
            getUpcomingQuizzes();
            getUpcomingMeetings();
            getUpcomingPrs();
        }
    }, [token, studentId]);

    return (
        <Fragment>
            <Typography className={classes.pageTitle} variant='h3'>Welcome</Typography>

            <Typography className={classes.detailText} variant='h5'>Upcoming Quizzes</Typography>
            <div className={classes.formList}>
                <List component='nav'>
                    {upcomingQuizzes.length === 0 && 
                        <Card variant='elevation' className={classes.formCard}>
                            <CardContent>
                                <Typography>No upcoming quizzes.</Typography>
                            </CardContent>
                        </Card>
                    }
                    {upcomingQuizzes.map((quiz, index) => 
                        <Card variant='outlined' key={index} className={classes.formCard}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography color='textSecondary' gutterBottom>
                                        {quiz.title}
                                    </Typography>
                                    <Typography>{quiz.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )}
                </List>
            </div>

            <Typography className={classes.detailText} variant='h5'>Upcoming Meetings</Typography>
            <div className={classes.formList}>
                <List component='nav'>
                    {upcomingMeetings.length === 0 && 
                        <Card variant='elevation' className={classes.formCard}>
                            <CardContent>
                                <Typography>No upcoming meetings.</Typography>
                            </CardContent>
                        </Card>
                    }
                    {upcomingMeetings.map((meeting, index) => 
                        <Card variant='outlined' key={index} className={classes.formCard}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography color='textSecondary' gutterBottom>
                                        {meeting.title}
                                    </Typography>
                                    <Typography>{meeting.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )}
                </List>
            </div>

            <Typography className={classes.detailText} variant='h5'>Upcoming Peer Reviews</Typography>
            <div className={classes.formList}>
                <List component='nav'>
                    {upcomingPrs.length === 0 && 
                        <Card variant='elevation' className={classes.formCard}>
                            <CardContent>
                                <Typography>No upcoming peer reviews.</Typography>
                            </CardContent>
                        </Card>
                    }
                    {upcomingPrs.map((pr, index) => 
                        <Card variant='outlined' key={index} className={classes.formCard}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography color='textSecondary' gutterBottom>
                                        {pr.title}
                                    </Typography>
                                    <Typography>{pr.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )}
                </List>
            </div>
        </Fragment>
    );
}

export default Home
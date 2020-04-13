import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        height: '20%',
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
    const [upcomingAlerts, setUpcomingAlerts] = useState([]);

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
                setUpcomingAlerts(result.data);
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
    }, [token, userId, userType]);

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
            {userType === 'student' && 
                <Fragment>
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
            }
            {userType === 'coordinator' && 
                <Fragment>
                    <Typography className={classes.detailText} variant='h5'>Current Alerts</Typography>
                    <div className={classes.formList}>
                        <List component='nav'>
                            {upcomingAlerts.length === 0 && 
                                <Card variant='elevation' className={classes.formCard}>
                                    <CardContent>
                                        <Typography>No current alerts.</Typography>
                                    </CardContent>
                                </Card>
                            }
                            {upcomingAlerts.map((alert, index) => 
                                <Card variant='outlined' key={index} className={classes.formCard}>
                                    <CardActionArea component={Link} to={{
                                        pathname: `/coordinator/Alert/ViewAlert/${alert.title}`,
                                        state: { alert: alert }
                                    }}>
                                        <CardContent>
                                            <Typography color='secondary' gutterBottom>
                                                {alert.project_name} - {alert.first_name} {alert.last_name}
                                            </Typography>
                                            <Typography color='textSecondary' gutterBottom>
                                                Form Type: {alert.type}
                                            </Typography>
                                            <Typography>
                                                {alert.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )}
                        </List>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}

export default Home
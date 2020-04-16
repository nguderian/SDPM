import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CompleteForm from './common/CompleteForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
        maxHeight: 700,
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
    progress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '25%'
    },
}));


const Home = ({ userId, userType, token }) => {
    const classes = useStyles();
    const [studentId, setStudentId] = useState('');
    const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
    const [upcomingMeetings, setUpcomingMeetings] = useState([]);
    const [upcomingPrs, setUpcomingPrs] = useState([]);
    const [upcomingAlerts, setUpcomingAlerts] = useState([]);
    const [quizToShow, setQuizToShow] = useState({
        showQuiz: false,
        quizAtIndex: ''
    });
    const [prToShow, setPrToShow] = useState({
        showPr: false,
        prAtIndex: {}
    });
    const [meetingToShow, setMeetingToShow] = useState({
        showMeeting: false,
        meetingAtIndex: {}
    });

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
                        'is_viewed': 0
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
                setUpcomingPrs(result.data);
            }
            getUpcomingQuizzes();
            getUpcomingMeetings();
            getUpcomingPrs();
        }
    }, [token, studentId]);

    const handleQuizCardClick = (index) => {
        setQuizToShow({ showQuiz: true, quizAtIndex: upcomingQuizzes[index] });
    };

    const handlePrCardClick = (index) => {
        setPrToShow({ showPr: true, prAtIndex: upcomingPrs[index] });
    };

    const handleMeetingCardClick = (index) => {
        setMeetingToShow({ showMeeting: true, meetingAtIndex: upcomingMeetings[index] });
    };
    
    return (
        (userType === 'student' && upcomingPrs.length === 0) || (userType === 'coordinator' && upcomingAlerts.length === 0) ?
        <div className={classes.progress}>
            <CircularProgress />
        </div> :
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
                                    <CardActionArea onClick={() => handleQuizCardClick(index)}>
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
                                    <CardActionArea onClick={() => handleMeetingCardClick(index)}>
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
                                    <CardActionArea onClick={() => handlePrCardClick(index)}>
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
            
            {quizToShow.showQuiz && <CompleteForm 
                open={quizToShow.showQuiz}
                onClose={() => setQuizToShow({ showQuiz: false, quizAtIndex: '' })}
                formTitle={quizToShow.quizAtIndex.title}
                formDescription={quizToShow.quizAtIndex.description}
                buttonText='Take this quiz'
                routeForward={{ 
                    pathname: `/student/Quiz/${quizToShow.quizAtIndex.title}`, 
                    state: { 
                        formId: quizToShow.quizAtIndex.form_id, 
                        instanceId: quizToShow.quizAtIndex.instance_id, 
                        studentId: studentId
                    }
                }}
            />}

            {prToShow.showPr && <CompleteForm 
                open={prToShow.showPr}
                onClose={() => setPrToShow({ showPr: false, prAtIndex: {} })}
                formTitle={prToShow.prAtIndex.title}
                formDescription={prToShow.prAtIndex.description}
                buttonText='Complete Peer Review'
                routeForward={{
                    pathname: `/student/PeerReview/${prToShow.prAtIndex.title}`,
                    state: {
                        pr: prToShow.prAtIndex,
                        studentId: studentId
                    }
                }}
            />}

            {meetingToShow.showMeeting && <CompleteForm 
                open={meetingToShow.showMeeting}
                onClose={() => setMeetingToShow({ showMeeting: false, meetingAtIndex: {} })}
                formTitle={meetingToShow.meetingAtIndex.title}
                formDescription={meetingToShow.meetingAtIndex.description}
                buttonText='Take Attendance'
                routeForward={{
                    pathname: `/student/Meeting/${meetingToShow.meetingAtIndex.title}`,
                    state: {
                        meeting: meetingToShow.meetingAtIndex,
                        studentId: studentId
                    }
                }}
            />}
        </Fragment>
    );
}

Home.propTypes = {
    userId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
}

export default Home
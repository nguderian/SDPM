import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CompleteForm from '../../common/CompleteForm';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    divider: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }, 
    createButton: {
      marginLeft: theme.spacing(7),
      marginTop: theme.spacing(1),
      height: '7%',
    },
    meetingList: {
        flexGrow: 1,
        maxHeight: '40%',
        overflowY: 'scroll',
        border: '1px solid gray',
        borderRadius: '5px',
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7), 
        marginBottom: theme.spacing(7)
    }, 
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    meetingCard: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }, 
    detailText: {
        marginLeft: theme.spacing(7),
        marginBottom: theme.spacing(2)
    },
    classSelector: {
        marginLeft: theme.spacing(7),
        marginBottom: theme.spacing(2), 
        width: '15%'
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: theme.spacing(2)
    }
}));

const ViewMeetings = ({ userId, token }) => {
    const classes = useStyles();
    const [upcomingMeetings, setUpcomingMeetings] = useState([]);
    const [completedMeetings, setCompletedMeetings] = useState([]);
    const [activeClasses, setActiveClasses] = useState([]);
    const [inactiveClasses, setInactiveClasses] = useState([]);
    const [activeStudentId, setActiveStudentId] = useState('');
    const [inactiveStudentId, setInactiveStudentId] = useState('');
    const [meetingToShow, setMeetingToShow] = useState({
        showMeeting: false,
        meetingAtIndex: {},
        upcoming: false,
        completed: false
    });

    useEffect(() => {
        async function getActiveClasses() {
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
            setActiveClasses(result.data);
        }
        async function getInactiveClasses() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getAllClasses',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {
                    'user_id': userId,
                    'is_active': 0
                },
            };

            let result = await axios(options);
            setInactiveClasses(result.data);
        }
        getActiveClasses();
        getInactiveClasses();
    }, [token, userId]);

    useEffect(() => {
        if(activeStudentId) {
            async function getUpcomingMeetings() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getInstances',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'student_id': activeStudentId,
                        'type': 'meeting',
                        'is_complete': 0
                    }
                };
        
                let result = await axios(options);
                setUpcomingMeetings(result.data);
            }
            async function getCompletedMeetings() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getInstances',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'student_id': activeStudentId,
                        'type': 'meeting',
                        'is_complete': 1
                    }
                };
        
                let result = await axios(options);
                setCompletedMeetings(result.data);
            }
            getUpcomingMeetings();
            getCompletedMeetings();
        }
    }, [activeStudentId, token]);

    const handleActiveClassChange = event => {
        setActiveStudentId(event.target.value);   
    };

    const handleInactiveClassChange = event => {
        setInactiveStudentId(event.target.value);
    };

    const handleMeetingCardClick = (index, type) => {
        if(type === 'upcoming') {
            setMeetingToShow({ showMeeting: true, meetingAtIndex: upcomingMeetings[index], upcoming: true, completed: false });
        }
        else if(type === 'completed') {
            setMeetingToShow({ showMeeting: true, meetingAtIndex: completedMeetings[index], upcoming: false, completed: true });
        }
    };

    return (
        <Fragment>
            <Typography variant="h4" className={classes.pageTitle}>Meetings</Typography>
            <Divider className={classes.divider} variant="fullWidth"/>
            <div className={classes.options}>
            
            <FormControl variant='outlined' className={classes.classSelector}>
                <InputLabel>Select current class</InputLabel>
                <Select
                    label='Current Class'
                    value={activeStudentId}
                    onChange={handleActiveClassChange}
                >
                    {activeClasses.map((activeClass, index) => 
                        <MenuItem key={index} value={activeClass.student_id}>{activeClass.name}</MenuItem>
                    )}
                </Select>
            </FormControl>

            <FormControl variant='outlined' className={classes.classSelector}>
                <InputLabel>Select previous class</InputLabel>
                <Select
                    label='Previous class'
                    value={inactiveStudentId}
                    disabled={inactiveClasses.length === 0 ? true : false}
                    onChange={handleInactiveClassChange}
                >
                    {inactiveClasses.map((inactiveClass, index) => 
                        <MenuItem key={index} value={inactiveClass.student_id}>{inactiveClass.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <Button 
                className={classes.createButton} 
                variant="contained" 
                color="primary" 
                component={Link} 
                to={{ pathname: '/student/Meeting/NewMeeting', state: { studentId: activeStudentId } }}
                disabled={activeStudentId === '' ? true : false }
            >
                Create New
            </Button>
            </div>
            
            <Typography className={classes.detailText} variant='h5'>Upcoming</Typography>
            <div className={classes.meetingList}>
                <List component='nav'>
                    {upcomingMeetings.length === 0 &&
                        <Card variant='elevation' className={classes.meetingCard}>
                            <CardContent>
                                <Typography>No upcoming meetings. Please select a class</Typography>
                            </CardContent>
                        </Card>
                    }
                    {upcomingMeetings.map((meeting, index) => 
                        <Card variant='outlined' key={index} className={classes.meetingCard}>
                            <CardActionArea onClick={() => handleMeetingCardClick(index, 'upcoming')}>
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
            
            <Typography className={classes.detailText} variant='h5'>Completed</Typography>
            <div className={classes.meetingList}>
                <List component='nav'>
                    {completedMeetings.length === 0 &&
                        <Card variant='elevation' className={classes.meetingCard}>
                            <CardContent>
                                <Typography>No completed meetings. Please select a class</Typography>
                            </CardContent>
                        </Card>
                    }
                    {completedMeetings.map((meeting, index) => 
                        <Card variant='outlined' key={index} className={classes.meetingCard}>
                            <CardActionArea onClick={() => handleMeetingCardClick(index, 'completed')}>
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

            {meetingToShow['showMeeting'] && <CompleteForm 
                open={meetingToShow['showMeeting']}
                onClose={() => setMeetingToShow({ showMeeting: false, meetingAtIndex: {} })}
                formTitle={meetingToShow['meetingAtIndex'].title}
                formDescription={meetingToShow['meetingAtIndex'].description}
                buttonText={meetingToShow.upcoming ? 'Take Attendance' : 'View this submission'}
                routeForward={{
                    pathname: meetingToShow.upcoming ? `/student/Meeting/${meetingToShow['meetingAtIndex'].title}` : `/viewSubmission/Meeting/${meetingToShow.meetingAtIndex.title}`,
                    state: {
                        meeting: meetingToShow['meetingAtIndex'],
                        studentId: activeStudentId === '' ? inactiveStudentId : activeStudentId,
                        instanceId: meetingToShow.meetingAtIndex.instance_id
                    }
                }}
            />}
        </Fragment>
    )
}

ViewMeetings.propTypes = {
    userId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
}

export default ViewMeetings;
import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
      marginBottom: theme.spacing(2),
      width: '7%'
    },
    meetingList: {
        flexGrow: 1,
        maxHeight: '40%',
        overflowY: 'scroll',
        border: '1px solid gray',
        borderRadius: '5px',
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7), 
        marginBottom: theme.spacing(2)
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
        flexDirection: 'column',
    }
}));

const ViewMeetings = ({ userId, userType, token, loggedIn }) => {
    const classes = useStyles();
    const [allMeetings, setAllMeetings] = useState([]);
    const [classList, setClassList] = useState([]);
    const [studentId, setStudentId] = useState('');

    useEffect(() => {
        async function getAllClasses() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getAllClasses',
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
            setClassList(result.data);
        }
        getAllClasses();
    }, []);

    useEffect(() => {
        if(studentId) {
            async function getAllMeetings() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getInstances',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'student_id': studentId,
                        'type': 'meeting'
                    }
                };
        
                let result = await axios(options);
                console.log(result);
                setAllMeetings(result.data);
            }
            getAllMeetings();
        }
    }, [studentId]);

    const handleClassChange = event => {
        setStudentId(event.target.value);   
    };

    return (
        <div>
            <Typography variant="h4" className={classes.pageTitle}>Meetings</Typography>
            <Divider className={classes.divider} variant="fullWidth"/>
            <div className={classes.options}>
            <FormControl variant='outlined' className={classes.classSelector}>
                <InputLabel>Select Class</InputLabel>
                <Select
                    label='Class'
                    value={studentId}
                    onChange={handleClassChange}
                >
                    {classList.map((classItem, index) => 
                        <MenuItem key={index} value={classItem.student_id}>{classItem.name}</MenuItem>
                    )}
                </Select>
            </FormControl>

            <Button className={classes.createButton} variant="contained" color="primary" component={Link} to={{ pathname: '/student/Meeting/NewMeeting', state: { formId: '' }}}>
                Create New
            </Button>
            </div>
            
            <Typography className={classes.detailText} variant='h5'>Upcoming</Typography>
            <div className={classes.meetingList}>
                <List component='nav'>
                    {allMeetings.length === 0 &&
                        <Card variant='elevation' className={classes.meetingCard}>
                            <CardContent>
                                <Typography>No upcoming meetings. Please select a class</Typography>
                            </CardContent>
                        </Card>
                    }
                    {allMeetings.map((meeting, index) => 
                        <Card variant='outlined' key={index} className={classes.meetingCard}>
                            <CardActionArea component={Link} to={{ pathname: `/student/Meeting/${meeting.title}`, state: { formId: meeting.form_id, instanceId: meeting.instance_id, studentId: studentId }}}>
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
                    {allMeetings.length === 0 &&
                        <Card variant='elevation' className={classes.meetingCard}>
                            <CardContent>
                                <Typography>No completed meetings. Please select a class</Typography>
                            </CardContent>
                        </Card>
                    }
                    {allMeetings.map((meeting, index) => 
                        <Card variant='outlined' key={index} className={classes.meetingCard}>
                            <CardActionArea component={Link} to={{ pathname: `/student/Meeting/${meeting.title}`, state: { formId: meeting.form_id, instanceId: meeting.instance_id, studentId: studentId }}}>
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
        </div>
    )
}

export default ViewMeetings;
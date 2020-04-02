import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import axios from 'axios';


const formatDate = dateTime => {
    let month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
    let monthDate = ("0" + dateTime.getDate()).slice(-2);
    let hours = ("0" + dateTime.getHours()).slice(-2);
    let minutes = ("0" + dateTime.getMinutes()).slice(-2);
    let seconds = ("0" + dateTime.getSeconds()).slice(-2);
    let formattedDateTime = `${dateTime.getFullYear()}-${month}-${monthDate} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
};

const useStyles = makeStyles(theme => ({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    meetingTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    meetingDetails: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        minWidth: 250
    },
    createButton: {
        margin: theme.spacing(1),
        textAlign: 'center',
        marginTop: theme.spacing(2),
    }
}));


const NewMeeting = ({ userId, userType, token, loggedIn}) => {
    //TODO: Authorization tokens are dynamic based on each user which needs to be used after login is created
    //TODO make a dropdown selector + get request for teams and team ids
    let formattedStart = new Date();
    formattedStart = formatDate(formattedStart);
    let formattedEnd = new Date();
    formattedEnd = formatDate(formattedEnd);
    const classes = useStyles();
    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingDescription, setMeetingDescription] = useState('');
    const [startDateTime, setStartDateTime] = useState(formattedStart);
    const [endDateTime, setEndDateTime] = useState(formattedEnd);
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');

    useEffect(() => {
        if(userType === 'coordinator') {
            async function getAllClasses() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getAllClasses',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }, 
                    data: {
                        'user_id': userId
                    }
                };

                const result = await axios(options);
                setClassList(result.data);
            }
            getAllClasses();
        }
    }, []);

    useEffect(() => {
        if(selectedClass) {
            async function getTeams() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getTeamsInClass',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'class_id': selectedClass
                    }
                };
    
                const result = await axios(options);
                console.log(result);
                setTeams(result.data);
            }
            getTeams()
        }
    }, [selectedClass]);

    const handlemeetingTitleChange = event => {
        setMeetingTitle(event.target.value);
    };

    const handlemeetingDescriptionChange = event => {
        setMeetingDescription(event.target.value)
    };

    const handleStartDateTimeChange = dateTime => {
        let formattedDateTime = formatDate(dateTime);
        setStartDateTime(formattedDateTime);
    };

    const handleEndDateTimeChange = dateTime => {
        let formattedDateTime = formatDate(dateTime);
        setEndDateTime(formattedDateTime);
    };

    const handleClassChange = event => {
        setSelectedClass(event.target.value);
    };

    const handleTeamChange = event => {
        setSelectedTeam(event.target.value);
    };

    async function createMeeting() {
        let body = {
            'type': 'meeting',
            'access_level': userType,
            'user_id': userId,
            'title': meetingTitle,
            'description': meetingDescription,
            'start_date': startDateTime,
            'end_date': endDateTime,
            'team_id': selectedTeam
        }

        let options = {
            method: 'POST',
            url: 'http://localhost:3001/api/CreateForm',
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            },
            data: body
        }

        let response = await axios(options);
        console.log(response);
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        if(responseOK) {
            console.log('meeting made');
        }
        else {
            console.log('something went wrong');
        }
    };

    return (
        <Fragment>
            <Typography variant='h4' className={classes.pageTitle}>Create a new meeting</Typography>

            <form className={classes.meetingTitle} noValidate autoComplete='off'>
                <TextField 
                    error={meetingTitle === '' ? true : false}
                    helperText={meetingTitle === '' ? 'Meeting title is required.' : ''}
                    label='Meeting Title'
                    variant='outlined'
                    fullWidth={true}
                    onChange={handlemeetingTitleChange}
                />
            </form>
            <form className={classes.meetingTitle} noValidate autoComplete='off'>
                <TextField 
                    label='Meeting Description'
                    variant='outlined'
                    fullWidth={true}
                    onChange={handlemeetingDescriptionChange}
                />
            </form>

            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker 
                        className={classes.meetingDetails}
                        label='Start'
                        inputVariant='outlined'
                        value={startDateTime}
                        onChange={handleStartDateTimeChange}
                        disablePast={true}
                    />
                    <DateTimePicker 
                        className={classes.meetingDetails}
                        label='End'
                        inputVariant='outlined'
                        value={endDateTime}
                        onChange={handleEndDateTimeChange}
                        disablePast={true}
                    />
                </MuiPickersUtilsProvider>
                {userType === 'coordinator' && 
                    <Fragment>
                        <FormControl variant='outlined' className={classes.meetingDetails}>
                            <InputLabel>Class</InputLabel>
                            <Select
                                label="Class"
                                value={selectedClass}
                                onChange={handleClassChange}
                            >   
                                {classList.map((classItem, index) => 
                                    <MenuItem key={index} value={classItem.class_id}>{classItem.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl variant='outlined' className={classes.meetingDetails}>
                            <InputLabel>Teams</InputLabel>
                            <Select
                                label="Team"
                                value={selectedTeam}
                                onChange={handleTeamChange}
                            >   
                                {teams.map((team, index) => 
                                    <MenuItem key={index} value={team.team_id}>{team.project_name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Fragment>
                }
                
            </div>
            <Button
                variant='contained'
                color='primary'
                onClick={createMeeting}
                className={classes.createButton}
            >
                Create Meeting
            </Button>
        </Fragment>
    )
}

export default NewMeeting;
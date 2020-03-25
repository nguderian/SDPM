import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import axios from 'axios';

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
    createButton: {
        margin: theme.spacing(1),
        textAlign: 'center',
        marginTop: theme.spacing(2),
    }
}));


const NewMeeting = ({ userId, userType, token, loggedIn}) => {
    //TODO: Authorization tokens are dynamic based on each user which needs to be used after login is created
    //TODO make a dropdown selector + get request for teams and team ids
    const classes = useStyles();
    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingDescription, setMeetingDescription] = useState('');
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());

    const handlemeetingTitleChange = event => {
        setMeetingTitle(event.target.value);
    };

    const handlemeetingDescriptionChange = event => {
        setMeetingDescription(event.target.value)
    };

    const handleStartDateTimeChange = dateTime => {
        let month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
        let monthDate = ("0" + dateTime.getDate()).slice(-2);
        let hours = ("0" + dateTime.getHours()).slice(-2);
        let minutes = ("0" + dateTime.getMinutes()).slice(-2);
        let seconds = ("0" + dateTime.getSeconds()).slice(-2);
        let formattedDateTime = `${dateTime.getFullYear()}-${month}-${monthDate} ${hours}:${minutes}:${seconds}`;
        setStartDateTime(formattedDateTime);
    };

    const handleEndDateTimeChange = dateTime => {
        let month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
        let monthDate = ("0" + dateTime.getDate()).slice(-2);
        let hours = ("0" + dateTime.getHours()).slice(-2);
        let minutes = ("0" + dateTime.getMinutes()).slice(-2);
        let seconds = ("0" + dateTime.getSeconds()).slice(-2);
        let formattedDateTime = `${dateTime.getFullYear()}-${month}-${monthDate} ${hours}:${minutes}:${seconds}`;
        setEndDateTime(formattedDateTime);
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
            'team_id': 1 //TODO: create get request to load all the teams that exist with their associated id
        }

        let options = {
            method: 'POST',
            url: 'http://localhost:3001/api/CreateForm',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhbnZpciIsImlhdCI6MTU4NDQ5OTEwNiwiZXhwIjoxNTg3MDkxMTA2fQ.smBUubIYJmf7Zefbr2pWf-wl-Uoqnmh598DA4IYnhfE'
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
                        className={classes.meetingTitle}
                        label='Start'
                        inputVariant='outlined'
                        value={startDateTime}
                        onChange={handleStartDateTimeChange}
                        disablePast={true}
                    />
                    <DateTimePicker 
                        className={classes.meetingTitle}
                        label='End'
                        inputVariant='outlined'
                        value={endDateTime}
                        onChange={handleEndDateTimeChange}
                        disablePast={true}
                    />
                </MuiPickersUtilsProvider>
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
import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import FormCreated from '../../common/FormCreated';
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


const NewMeeting = ({ userId, userType, token, location }) => {
    let formattedStart = new Date();
    formattedStart = formatDate(formattedStart);
    let formattedEnd = new Date();
    formattedEnd = formatDate(formattedEnd);
    const classes = useStyles();
    const { studentId } = location.state;
    const [meetingTitle, setMeetingTitle] = useState('');
    const [teamData, setTeamData] = useState({});
    const [meetingDescription, setMeetingDescription] = useState('');
    const [startDateTime, setStartDateTime] = useState(formattedStart);
    const [endDateTime, setEndDateTime] = useState(formattedEnd);
    const [formCreated, setFormCreated] = useState(false);

    useEffect(() => {
        async function getTeam() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getTeamID',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {
                    'student_id': studentId
                },
            };

            let result = await axios(options);
            setTeamData(result.data);
        }
        getTeam()
    }, [studentId, token]);

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

    const handleCloseFormCreatedDialog = () => {
        setFormCreated(false)
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
            'team_id': teamData[0].team_id
        }

        let options = {
            method: 'POST',
            url: 'http://localhost:3001/api/createForm',
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            },
            data: body
        }

        let response = await axios(options);
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        let success = true;
        if(responseOK) {
            success = success && true;
        }
        else {
            success = success && true;
        }

        setFormCreated(success);
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
            </div>

            <Button
                variant='contained'
                color='primary'
                onClick={createMeeting}
                className={classes.createButton}
            >
                Create Meeting
            </Button>
            
            {formCreated && <FormCreated 
                open={formCreated}
                onClose={() => handleCloseFormCreatedDialog()}
                confirmationText={`${meetingTitle} created!`}
                createdText='Meeting Created'
                start={startDateTime}
                end={endDateTime}
                assigned='Your team'
                alertGrade=''
                routeBack='/student/Meeting/ViewMeetings'
            />}
        </Fragment>
    )
}

NewMeeting.propTypes = {
    userId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
}

export default NewMeeting;
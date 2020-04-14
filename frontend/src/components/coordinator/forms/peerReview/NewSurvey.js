import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import FormControllabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox';
import FormCreated from '../../../common/FormCreated';
import DateFnsUtils from '@date-io/date-fns'
import { 
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers/';

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
    surveyTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    surveyDetails: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        minWidth: 250
    },
    divider: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }, 
    createButton: {
        margin: theme.spacing(1),
        textAlign: 'center',
        marginTop: theme.spacing(2),
    },
    questionCard: {
        width: '20%',
        margin: theme.spacing(1)
    },
    studentList: {
        flexGrow: 1,
        maxHeight: 300,
        overflow: 'auto'
    },
    questionTitle: {
        fontSize: 14
    },
    checkBox: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
    },
    slider: {
        width: '15%',
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
    }
}));

const NewSurvey = ({ userId, userType, token, loggedIn }) => {
    let formattedStart = new Date();
    formattedStart = formatDate(formattedStart);
    let formattedEnd = new Date();
    formattedEnd = formatDate(formattedEnd);
    const classes = useStyles();
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyDescription, setSurveyDescription] = useState('');
    const [hasAlertValue, setHasAlertValue] = useState(false);
    const [alertValue, setAlertValue] = useState('');
    const [formCreated, setFormCreated] = useState(false);
    const [startDateTime, setStartDateTime] = useState(formattedStart);
    const [endDateTime, setEndDateTime] = useState(formattedEnd);

    useEffect(() => {
        // only get all active classes 
        async function getClasses() {
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
                } 
            };

            const result = await axios(options);

            setClassList(result.data);
        }
        getClasses()
    }, [token, userId]);

    const handleSurveyTitleChange = event => {
        setSurveyTitle(event.target.value);
    };

    const handleSurveyDescriptionChange = event => {
        setSurveyDescription(event.target.value);
    };

    const handleClassChange = event => {
        setSelectedClass(event.target.value);
    };

    const handleHasAlertValue = event => {
        setHasAlertValue(event.target.checked);
    };

    const handleAlertValueChange = (event, value) => {
        setAlertValue(value);
    };

    const handleCloseFormCreateDialog = () => {
        setFormCreated(false);
    };

    const handleStartDateTimeChange = dateTime => {
        let formattedDateTime = formatDate(dateTime);
        setStartDateTime(formattedDateTime);
    };

    const handleEndDateTimeChange = dateTime => {
        let formattedDateTime = formatDate(dateTime);
        setEndDateTime(formattedDateTime);
    };

    async function createSurvey() {
        let body = {
            'type': 'survey',
            'access_level': userType,
            'user_id': userId,
            'title': surveyTitle,
            'description': surveyDescription,
            'questions': [
                {
                    'question_text': 'Participation grade: ',
                    'question_type': 'likert',
                    'question_threshold': alertValue
                }
            ]
        }

        let options = {
            method: 'POST',
            url: 'http://localhost:3001/api/createForm',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: body
        };

        let response = await axios(options);
        console.log(response);
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        let success = true;
        let newFormId = response.data.form_id;
        if(responseOK) {
            console.log(newFormId);
            success = success && true;
        }
        else {
            // send alert showing error and what the error was
            console.log('something went wrong');
            success = success && false;
        }

        // creating an instance of the form above
        body = {
            'class_id': selectedClass,
            'start_date': startDateTime,
            'end_date':  endDateTime,
            'form_id': newFormId,
            'code': 1
        };

        options = {
            method: 'POST',
            url: 'http://localhost:3001/api/assignForm',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: body
        }

        response = await axios(options);
        console.log(response);
        responseOK = response && response.status === 200 && response.statusText === 'OK';
        if(responseOK) {
            success = success && true;
        }
        else {
            // send alert showing error and what the error was
            console.log('something went wrong');
            success = success && false;
        }

        setFormCreated(success);
    };

    return (
        <Fragment>
            {console.log(alertValue)}
            <Typography variant="h4" className={classes.pageTitle}>Create a New Peer Review</Typography>
            <form className={classes.surveyTitle} noValidate autoComplete="off">
                <TextField
                    error={surveyTitle === '' ? true : false} 
                    helperText={surveyTitle === '' ? "Peer Review Title is required." : ''} 
                    label="Peer Review Title" 
                    variant="outlined" 
                    fullWidth={true} 
                    onChange={handleSurveyTitleChange}
                />
            </form>
            <form className={classes.surveyTitle} noValidate autoComplete="off">
                <TextField
                    label="Peer Review Description"
                    variant="outlined"
                    fullWidth={true}
                    onChange={handleSurveyDescriptionChange}
                />
            </form>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <FormControl variant='outlined' className={classes.surveyDetails}>
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
                
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker 
                        className={classes.surveyDetails}
                        label='Start'
                        inputVariant='outlined'
                        value={startDateTime}
                        onChange={handleStartDateTimeChange}
                        disablePast={true}
                    />
                    <DateTimePicker 
                        className={classes.surveyDetails}
                        label='End'
                        inputVariant='outlined'
                        value={endDateTime}
                        onChange={handleEndDateTimeChange}
                        disablePast={true}
                    />
                </MuiPickersUtilsProvider>

                
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <FormControllabel className={classes.checkBox}
                    control={
                        <Checkbox 
                            checked={hasAlertValue}
                            onChange={handleHasAlertValue}
                            color='primary'
                        />
                    }
                    label='Recieve Alerts?'
                />

                {hasAlertValue && 
                    <Slider
                        className={classes.slider}
                        defaultValue={2}
                        valueLabelDisplay='on'
                        step={1}
                        marks
                        min={1}
                        max={10}
                        onChange={(event, value) => handleAlertValueChange(event, value)}
                    />
                }
            </div>
            
            <Divider className={classes.divider}/>
            {selectedClass !== '' && 
                <Card variant='outlined' className={classes.questionCard}>
                    <CardContent>
                        <Typography>Participation Grade: </Typography>
                    </CardContent>
                </Card>
            }
            <Button 
                variant='contained'
                color='primary'
                onClick={createSurvey}
                className={classes.createButton}>
                Create Peer Review
            </Button>
            {formCreated && <FormCreated 
                open={formCreated}
                onClose={() => handleCloseFormCreateDialog()}
                confirmationText={`${surveyTitle} created!`}
                createdText='Peer Review Created'
                start={startDateTime}
                end={endDateTime}
                assigned={selectedClass}
                alertGrade={alertValue}
                routeBack='/coordinator/Survey/CreateSurvey'
            />}
        </Fragment>
    )
}

export default NewSurvey;
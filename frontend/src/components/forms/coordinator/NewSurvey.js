import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NewQuestion from './questions/NewQuestion';
import DeleteQuestion from './questions/DeleteQuestion';
import EditQuestion from './questions/EditQuestion';
import FormOrTemplateCreated from '../FormOrTemplateCreated';
import FormControl from '@material-ui/core/FormControl';
import FormControllabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns'
import { 
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers/';

import axios from 'axios';

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
    }
}));

const NewSurvey = ({ userId, userType, token, loggedIn }) => {
    const classes = useStyles();
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [teams, setTeams] = useState([]);
    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyDescription, setSurveyDescription] = useState('');

    useEffect(() => {
        async function getClasses() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getAllClasses',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhbnZpciIsImlhdCI6MTU4NDQ5OTEwNiwiZXhwIjoxNTg3MDkxMTA2fQ.smBUubIYJmf7Zefbr2pWf-wl-Uoqnmh598DA4IYnhfE'
                }, 
                data: {
                    'user_id': userId
                } 
            };

            const result = await axios(options);

            setClassList(result.data);
        }
        getClasses()
    }, []);

    const handleSurveyTitleChange = event => {
        setSurveyTitle(event.target.value);
    };

    const handleSurveyDescriptionChange = event => {
        setSurveyDescription(event.target.value);
    };

    const handleClassChange = event => {
        setSelectedClass(event.target.value);
    };

    //TODO: get request to get all teams from that class
    return (
        <Fragment>
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

            <div style={{ display: 'flex', flexDirection: 'row'}}>
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
            </div>
        </Fragment>
    )
}

export default NewSurvey;
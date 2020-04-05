import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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
        minWidth: 275,
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
}));

const NewSurvey = ({ userId, userType, token, loggedIn }) => {
    const classes = useStyles();
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyDescription, setSurveyDescription] = useState('');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function getClasses() {
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
        getClasses()
    }, []);

    // useEffect(() => {
    //     if(teamMembers) {
    //         function createQuestions() {
    //             let questions = [];
    //             teamMembers.map((teamMember, index) => 
    //                 questions.push({
    //                     'question_text': `Participation grade ${teamMember.first_name}?`,
    //                     'question_type': 'likert',
    //                     'question_threshold': 3
    //                 })
    //             )
    //             console.log(questions);
    //             setQuestions(questions);
    //         }
    //         createQuestions()
    //     }
    // }, [teamMembers]);

    const handleSurveyTitleChange = event => {
        setSurveyTitle(event.target.value);
    };

    const handleSurveyDescriptionChange = event => {
        setSurveyDescription(event.target.value);
    };

    const handleClassChange = event => {
        setSelectedClass(event.target.value);
    };

    async function createSurvey() {
        let questionsArr = [];
    };

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

            <Divider className={classes.divider}/>
            
            <Button 
                variant='contained'
                color='primary'
                onClick={createSurvey}
                className={classes.createButton}>
                Create Peer Review
            </Button>
        </Fragment>
    )
}

export default NewSurvey;
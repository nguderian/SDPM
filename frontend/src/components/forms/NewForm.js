import React, { useState, Fragment } from 'react';
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
import NewQuestion from './NewQuestion';
import DeleteQuestion from './DeleteQuestion';
import EditQuestion from './EditQuestion';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns'
import { 
    MuiPickersUtilsProvider,
    DatePicker, 
    TimePicker
} from '@material-ui/pickers/';

import axios from 'axios';


const useStyles = makeStyles(theme => ({
    formTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    createButton: {
        margin: theme.spacing(1),
        textAlign: 'center',
        marginTop: theme.spacing(2),
    },
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    dataTable: {
        width: 200,
    },
    root: {
        flexGrow: 1,
        maxHeight: 300,
        overflow: 'auto'
    },
    questionCard: {
        minWidth: 275,
        margin: theme.spacing(1)
    },
    title: {
        fontSize: 14
    },
    divider: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }, 
    formDetail: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        minWidth: 250
    }
}));

const NewForm = ({ user_id, userType, token, loggedIn }) => {
    // console.log(userType);
    const classes = useStyles();
    const [addQuestionOpen, setAddQuestionOpen] = useState(false);
    const [formName, setFormName] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [classForForm, setClassForForm] = useState('');
    const [distribution, setDistribution] = useState('');
    const [formType, setFormtype] = useState('');
    const [assignee, setAssignee] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [selectedStartTime, setSelectedStartTime] = useState(new Date());
    const [selectedEndTime, setSelectedEndTime] = useState(new Date());
    const [modificationParameters, setModificationParameters] = useState({
        deleteQuestionOpen: false,
        editQuestionOpen: false,
        indexToModify: null,
        questionToModify: null,
    });
    
    const handleModificationParameters = (parameters, values) => {
        const tempParams = {...modificationParameters};
        parameters.forEach((parameter, idx) => {
            tempParams[parameter] = values[idx];
        });
        
        setModificationParameters({...tempParams});
    };

    // event handlers
    const handleClickOpen = () => {
        setAddQuestionOpen(true);
    };

    const handleFormTitleChange = event => {
        setFormName(event.target.value);
    };

    const handleFormDescriptionChange = event => {
        setFormDescription(event.target.value)
    };

    const handleClassChange = event => {
        setClassForForm(event.target.value);
    };

    const addQuestion = (type, text, frqAnswer, threshold, mcAnswers, correctMCAnswers) => {
        let question = {};
        if (type === 3 || type === 2) {
            question = {
                questionType: type, 
                questionText: text,
                questionAnswer: frqAnswer === '' ? threshold : frqAnswer
            }
        }
        else {
            question = {
                questionType: type,
                questionText: text,
                questionAnswer: mcAnswers,
                correctQuestionAnswers: correctMCAnswers
            }
        }
        setQuestions(questions.concat(question));
    };

    const deleteQuestion = (shouldDelete) => {
        if(shouldDelete) {
            let arr = [...questions]; // make a copy of our state
            arr.splice(modificationParameters.indexToModify, 1);
            setQuestions(arr);
        }
    };

    const editQuestion = (shouldEdit, type, text, frqAnswer, threshold, mcAnswers, correctMCAnswers) => {
        if(shouldEdit) {
            let question = {};
            if (type === 'Free Response' || type === 'Likert Scale') {
                question = {
                    questionType: type, 
                    questionText: text,
                    questionAnswer: frqAnswer === '' ? threshold : frqAnswer
                }
            }
            else {
                question = {
                    questionType: type,
                    questionText: text,
                    questionAnswer: mcAnswers,
                    correctQuestionAnswers: correctMCAnswers
                }
            }

            console.log(question);
            console.log(modificationParameters.indexToModify);
            let arr = [...questions];
            console.log(arr);
            arr[modificationParameters.indexToModify] = question;
            console.log(arr);
            setQuestions(arr);
        }
    };

    const handleDeleteQuestionClick = (index) => {
        handleModificationParameters(
            ["deleteQuestionOpen", "indexToModify"],
            [true, index]
        );
    };

    const handleEditQuestionClick = (index) => {
        handleModificationParameters(
            ["editQuestionOpen", "indexToModify", "questionToModify"],
            [true, index, questions[index]]
        );
    };

    const handleDistributionChange = event => {
        setDistribution(event.target.value);
    };

    const handleFormTypeChange = event => {
        setFormtype(event.target.value);
    };

    const handleAssigneeChange = event => {
        setAssignee(event.target.value);
    };

    const handleStartDateChange = date => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = date => {
        setSelectedEndDate(date);
    };

    const handleStartTimeChange = time => {
        setSelectedStartTime(time);
    };

    const handleEndTimeChange = time => {
        setSelectedEndTime(time);
    };

    const createForm = () => {
        let questionsArr = [];
        
        questions.forEach((question, index) => {
            let questionObj = {
                "question_category_id": null,
                "question_text": null,
                "answers": []
            };

            questionObj.question_category_id = question.questionType;
            questionObj.question_text = question.questionText;

            if (question.questionType === 3 || question.questionType === 2) {
                questionObj.answers.push({
                    "answer_Text" : question.questionAnswer, 
                    "is_correct" : question.questionAnswer === '' ? 0 : 1
                });
            }
            else {
               const keys = Object.keys(question.questionAnswer);

               keys.forEach((key, index) => {
                   if (question.questionAnswer[key] !== '') {
                       questionObj.answers.push({
                           "answer_text": question.questionAnswer[key],
                           "is_correct": question.correctQuestionAnswers[key] ? 1 : 0
                       })
                   }
               })
            }

            questionsArr.push(questionObj);
        });

        // console.log(questionsArr)
        let body = {
            "title": formName,
            "description": formDescription,
            "sd1_term": "fall", 
            "sd1_year": 2018,
            "sd2_term": "spring",
            "sd2_year": 2019,
            "user_id": user_id,
            questions: questionsArr
        }

        let options = {
            method: 'POST',
            url: 'http://localhost:3001/api/createForm',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: body
        };

        console.log(options);
        // let response = await axios(options);
        // let responseOK = response && response.status === 200 && response.statusText === 'OK';
        // if(responseOK) {
        //     // send confirmation that form was created
        // }
        // else {
        //     // send alert showing error and what the error was
        //     console.log('something went wrong')
        // }
    };

    
    return (
        <Fragment>
            <Typography variant="h4" className={classes.pageTitle}>Create a New Form</Typography>
            <form className={classes.formTitle} noValidate autoComplete="off">
                <TextField id="outlined-basic" 
                    error={formName === '' ? true : false} 
                    helperText={formName === '' ? "Form name is required." : ''} 
                    label="Form Name" 
                    variant="outlined" 
                    fullWidth={true} 
                    onChange={handleFormTitleChange}
                />
            </form>
            <form className={classes.formTitle} noValidate autoComplete="off">
                <TextField
                    label="Form Description"
                    variant="outlined"
                    fullWidth={true}
                    onChange={handleFormDescriptionChange}
                />
            </form>
            
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <FormControl variant="outlined" className={classes.formDetail}>
                    <InputLabel>Distribution</InputLabel>
                    <Select
                        label="Distribution"
                        value={distribution}
                        onChange={handleDistributionChange}
                    >
                        <MenuItem value="template">Template</MenuItem>
                        <MenuItem value="instance">Instance</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formDetail}>
                    <InputLabel>Form Type</InputLabel>
                    <Select
                        label="Form Type"
                        value={formType}
                        onChange={handleFormTypeChange}
                    >
                        <MenuItem value="survey">Survey</MenuItem>
                        <MenuItem value="quiz">Quiz</MenuItem>
                        <MenuItem value="meeting">Meeting</MenuItem>
                        <MenuItem value="attendance">Attendance</MenuItem>
                    </Select>
                </FormControl>
                
                {distribution === 'instance' && 
                    <Fragment>
                        <FormControl variant="outlined" className={classes.formDetail}>
                            <InputLabel>Class</InputLabel>
                            <Select
                                label="Class"
                                value={classForForm}
                                onChange={handleClassChange}
                            >
                                <MenuItem value="sd1">SD1</MenuItem>
                                <MenuItem value="sd2">SD2</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formDetail}>
                            <InputLabel>Assign to Who?</InputLabel>
                            <Select
                                label="Assignee"
                                value={assignee}
                                onChange={handleAssigneeChange}
                            >
                                <MenuItem value="allStudents">All students</MenuItem>
                                <MenuItem value="teams">Teams</MenuItem>
                                <MenuItem value="individuals">Individuals</MenuItem>
                            </Select>
                        </FormControl>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>  
                            <DatePicker
                                className={classes.formTitle}
                                label="Start Date"
                                animateYearScrolling={true}
                                disablePast={true}
                                value={selectedStartDate}
                                onChange={handleStartDateChange}
                                minDate={new Date()}
                                format="MM/dd/yyy"
                            /> 
                            <DatePicker
                                className={classes.formTitle}
                                label="End Date"
                                animateYearScrolling={true}
                                disablePast={true}
                                value={selectedEndDate}
                                onChange={handleEndDateChange}
                                minDate={new Date()}
                                format="MM/dd/yyy"
                            />
                            <TimePicker
                                className={classes.formTitle}
                                label="Start Time"
                                value={selectedStartTime}
                                onChange={handleStartTimeChange}
                            />
                            <TimePicker
                                className={classes.formTitle}
                                label="End Time"
                                value={selectedEndTime}
                                onChange={handleEndTimeChange}
                            />
                        </MuiPickersUtilsProvider>
                    </Fragment>
                }
            </div>
            
            <Button className={classes.createButton} variant="contained" color="primary" onClick={handleClickOpen}>
                Add Question 
            </Button>
            {addQuestionOpen && <NewQuestion 
                open={addQuestionOpen} 
                onClose={() => setAddQuestionOpen(false)}
                add={addQuestion}
                />}
            <Divider className={classes.divider} variant="fullWidth"/>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {questions.map((question, index) => 
                        <Grid item xs={4} key={index}>
                            <Card className={classes.questionCard} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {question.questionType === 3 && 'Free Response'}
                                        {question.questionType === 2 && 'Likert Scale'}
                                        {question.questionType === 1 && 'Multiple Choice'}
                                    </Typography>
                                    <Typography>{question.questionText}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button 
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleEditQuestionClick(index)}>
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDeleteQuestionClick(index)}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={createForm}
                className={classes.createButton}>
                Create Form
            </Button>
            {modificationParameters.deleteQuestionOpen && <DeleteQuestion 
                open={modificationParameters.deleteQuestionOpen}
                onClose={() => handleModificationParameters(["deleteQuestionOpen"], [false])}
                deleteQuestion={deleteQuestion}
            />}
            {modificationParameters.editQuestionOpen && <EditQuestion 
                open={modificationParameters.editQuestionOpen}
                onClose={() => handleModificationParameters(["editQuestionOpen"], [false])}
                editQuestion={editQuestion}
                question={modificationParameters.questionToModify}
            />}
        </Fragment>
    );
}

export default NewForm;


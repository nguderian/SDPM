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
import NewQuestion from '../questions/NewQuestion';
import DeleteQuestion from '../questions/DeleteQuestion';
import EditQuestion from '../questions/EditQuestion';
import FormOrTemplateCreated from '../FormOrTemplateCreated';
import FormControl from '@material-ui/core/FormControl';
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
    quizTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
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
    root: {
        flexGrow: 1,
        maxHeight: 300,
        overflow: 'auto'
    },
    questionCard: {
        minWidth: 275,
        margin: theme.spacing(1)
    },
    questionTitle: {
        fontSize: 14
    },
    divider: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }, 
    quizDetails: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        minWidth: 250
    }
}));

const NewQuiz = ({ userId, userType, token, loggedIn }) => {
    // console.log(userType);
    const classes = useStyles();
    const [addQuestionOpen, setAddQuestionOpen] = useState(false);
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [classesToAssign, setClassesToAssign] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [instanceType, setInstanceType] = useState('');
    const [assignee, setAssignee] = useState('');
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [modificationParameters, setModificationParameters] = useState({
        deleteQuestionOpen: false,
        editQuestionOpen: false,
        indexToModify: null,
        questionToModify: null,
    });
    
    useEffect(() => {
        async function fetchData() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getAllClasses',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhbnZpciIsImlhdCI6MTU4NDQ5OTEwNiwiZXhwIjoxNTg3MDkxMTA2fQ.smBUubIYJmf7Zefbr2pWf-wl-Uoqnmh598DA4IYnhfE'
                }, 
                data: {
                    'user_id': 241
                }
            };
    
            // const result = await axios(options).then((result) => console.log(result.data));
            const result = await axios(options);
    
            setClassesToAssign(result.data);
        }
        fetchData();
    }, []);

    // event handlers
    const handleModificationParameters = (parameters, values) => {
        const tempParams = {...modificationParameters};
        parameters.forEach((parameter, idx) => {
            tempParams[parameter] = values[idx];
            console.log(tempParams[parameter], values[idx])
        });
        
        setModificationParameters({...tempParams});
    };

    const handleAddQuestion = () => {
        setAddQuestionOpen(true);
    };

    const handleQuizTitleChange = event => {
        setQuizTitle(event.target.value);
    };

    const handleQuizDescriptionChange = event => {
        setQuizDescription(event.target.value)
    };

    const handleClassChange = event => {
        setSelectedClass(event.target.value);
    };

    const addQuestion = (type, text, fillBlankAnswer, mcAnswers, correctMCAnswers) => {
        let question = {};
        if (type === 3 || type === 2) {
            question = {
                questionType: type, 
                questionText: text,
                questionAnswer: type === 2 ? fillBlankAnswer : ''
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

    const editQuestion = (shouldEdit, type, text, fillBlankAnswer, mcAnswers, correctMCAnswers) => {
        // console.log(shouldEdit, type, text, fillBlankAnswer, mcAnswers, correctMCAnswers);
        if(shouldEdit) {
            let question = {};
            if (type === 3 || type === 2) {
                question = {
                    questionType: type, 
                    questionText: text,
                    questionAnswer: type === 2 ? fillBlankAnswer : ''
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

            let arr = [...questions];
            arr[modificationParameters.indexToModify] = question;

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

    const handleInstanceChange = event => {
        setInstanceType(event.target.value);
    };

    const handleAssigneeChange = event => {
        setAssignee(event.target.value);
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

    async function createForm() {
        let questionsArr = [];

        questions.forEach((question, index) => {
            let questionObj = {
                "question_text": null,
                "question_type": null,
                "answers": []
            };

            questionObj.category_id = 2;
            questionObj.question_text = question.questionText;
            if(question.questionType === 1) {
                questionObj.question_type = "multiple_choice";
            }
            else if(question.questionType === 2) {
                questionObj.question_type = "fill_blank"
            }
            else if(question.questionType === 3) {
                questionObj.question_type = "free_response"
            }

           
            if (question.questionType === 2) {
                questionObj.answers.push({
                    "answer_text" : question.questionAnswer, 
                    "isCorrect" : 1
                });
            }
            else if (question.questionType === 3) {
               const keys = Object.keys(question.questionAnswer);

               keys.forEach((key, index) => {
                   if (question.questionAnswer[key] !== '') {
                       questionObj.answers.push({
                           "answer_text": question.questionAnswer[key],
                           "isCorrect": question.correctQuestionAnswers[key] ? 1 : 0
                       })
                   }
               })
            }

            questionsArr.push(questionObj);
        });

        let body = {
            'form_threshold': '', //TODO: Create UI element to capture the "failing grade"
            "type": 'quiz',
            "access_level": userType, //TODO: this is actually user type. The assignee goes under the 'code' field for /assignForm
            "user_id": userId,
            "title": quizTitle,
            "description": quizDescription,
            questions: questionsArr
        }

        let options = {
            method: 'POST',
            url: 'http://localhost:3001/api/createForm',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhbnZpciIsImlhdCI6MTU4NDQ5OTEwNiwiZXhwIjoxNTg3MDkxMTA2fQ.smBUubIYJmf7Zefbr2pWf-wl-Uoqnmh598DA4IYnhfE'
            },
            data: body
        };

        console.log(options);
        let response = await axios(options);
        console.log(response);
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        
        let newFormId = response.data.form_id;
        if(responseOK) {
            console.log(newFormId)
        }
        else {
            // send alert showing error and what the error was
            console.log('something went wrong')
        }

        if(instanceType === 'instance') {
            let body = {
                "class_id": selectedClass,
                "start_date": startDateTime,
                "end_date": endDateTime,
                "form_id": newFormId,
                "code": assignee
            };

            let options={
                method: 'POST',
                url: 'http://localhost:3001/api/assignForm',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhbnZpciIsImlhdCI6MTU4NDQ5OTEwNiwiZXhwIjoxNTg3MDkxMTA2fQ.smBUubIYJmf7Zefbr2pWf-wl-Uoqnmh598DA4IYnhfE'
                },
                data: body
            };

            console.log(options);
            let response = await axios(options);
            console.log(response);
            let responseOK = response && response.status === 200 && response.statusText === 'OK';
            
            if(responseOK) {
                console.log('successful instance created')
                
            }
            else {
                // send alert showing error and what the error was
                console.log('something went wrong')
            }
        }
    };

    
    return (
        <Fragment>
        {/* {console.log(questions)} */}
            <Typography variant="h4" className={classes.pageTitle}>Create a New Quiz</Typography>
            <form className={classes.quizTitle} noValidate autoComplete="off">
                <TextField
                    error={quizTitle === '' ? true : false} 
                    helperText={quizTitle === '' ? "Quiz Title is required." : ''} 
                    label="Quiz Title" 
                    variant="outlined" 
                    fullWidth={true} 
                    onChange={handleQuizTitleChange}
                />
            </form>
            <form className={classes.quizTitle} noValidate autoComplete="off">
                <TextField
                    label="Quiz Description"
                    variant="outlined"
                    fullWidth={true}
                    onChange={handleQuizDescriptionChange}
                />
            </form>
            
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <FormControl variant="outlined" className={classes.quizDetails}>
                    <InputLabel>Template / Instance</InputLabel>
                    <Select
                        label="Template / Instance"
                        value={instanceType}
                        onChange={handleInstanceChange}
                    >
                        <MenuItem value="template">Template</MenuItem>
                        <MenuItem value="instance">Instance</MenuItem>
                    </Select>
                </FormControl>
                
                {instanceType === 'instance' && 
                    <Fragment>
                        <FormControl variant="outlined" className={classes.quizDetails}>
                            <InputLabel>Class</InputLabel>
                            <Select
                                label="Class"
                                value={selectedClass}
                                onChange={handleClassChange}
                            >   
                                {classesToAssign.map((classToAssign, index) => 
                                    
                                    <MenuItem key={index} value={classToAssign.class_id}>{classToAssign.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.quizDetails}>
                            <InputLabel>Assign to Who?</InputLabel>
                            <Select
                                label="Assignee"
                                value={assignee}
                                onChange={handleAssigneeChange}
                            >
                                <MenuItem value={1}>All students</MenuItem>
                                <MenuItem value={2}>Teams</MenuItem>
                                <MenuItem value={3}>Individuals</MenuItem>
                            </Select>
                        </FormControl>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>  
                            <DateTimePicker 
                                className={classes.quizTitle}
                                label="Start"
                                inputVariant="outlined"
                                value={startDateTime}
                                onChange={handleStartDateTimeChange}
                                disablePast={true}
                            />
                            <DateTimePicker 
                                className={classes.quizTitle}
                                label="End"
                                inputVariant="outlined"
                                value={endDateTime}
                                onChange={handleEndDateTimeChange}
                                disablePast={true}
                            />
                        </MuiPickersUtilsProvider>
                    </Fragment>
                }
            </div>
            
            <Button className={classes.createButton} variant="contained" color="primary" onClick={handleAddQuestion}>
                Add Question 
            </Button>
            {addQuestionOpen && <NewQuestion 
                open={addQuestionOpen} 
                onClose={() => setAddQuestionOpen(false)}
                add={addQuestion}
                formType='quiz'
                />}
            <Divider className={classes.divider} variant="fullWidth"/>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {questions.map((question, index) => 
                        <Grid item xs={4} key={index}>
                            <Card className={classes.questionCard} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.questionTitle} color="textSecondary" gutterBottom>
                                        {question.questionType === 3 && 'Free Response'}
                                        {question.questionType === 2 && 'Fill in the blank'}
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
                Create Quiz
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
            {/* {instanceMade && <FormOrTemplateCreated 
                open={instanceMade}
                onClose={() => handle}
                confirmationText="Form Instance Created! What would you like to do?"
            />}
            {templateMade && <FormOrTemplateCreated 
                open={templateMade}
                onClose={() => handleCreateDialogClose(false)}
                confirmationText="Form Template Created! What would you like to do?"
            />} */}
        </Fragment>
    );
}

export default NewQuiz;
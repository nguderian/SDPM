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
import FormCreated from '../FormCreated';
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
    quizTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    checkBox: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
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

const NewQuiz = ({ userId, userType, token, loggedIn, location }) => {
    let formattedStart = new Date();
    let formattedEnd = new Date();
    formattedStart = formatDate(formattedStart);
    formattedEnd = formatDate(formattedEnd);

    const classes = useStyles();
    const { formId } = location.state;
    const [addQuestionOpen, setAddQuestionOpen] = useState(false);
    const [quiz, setQuiz] = useState(
        {
            title: '',
            description: '',
            hasAlertValue: false,
            alertValue: '',
            questions: [],
        }
    );
    
    // const [questions, setQuestions] = useState([]);
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [instanceType, setInstanceType] = useState('');
    const [assignee, setAssignee] = useState('');
    
    const [startDateTime, setStartDateTime] = useState(formattedStart);
    const [endDateTime, setEndDateTime] = useState(formattedEnd);
    const [formCreated, setFormCreated] = useState(false);
    const [modificationParameters, setModificationParameters] = useState({
        deleteQuestionOpen: false,
        editQuestionOpen: false,
        indexToModify: null,
        questionToModify: null,
    });
    
    useEffect(() => {
        if(formId !== '') {
            async function getFormDetails() {
                const options = {
                    method: 'POST', 
                    url: 'http://localhost:3001/api/getForm', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhbnZpciIsImlhdCI6MTU4NDQ5OTEwNiwiZXhwIjoxNTg3MDkxMTA2fQ.smBUubIYJmf7Zefbr2pWf-wl-Uoqnmh598DA4IYnhfE'
                    }, 
                    data: {
                        'form_id': formId,
                        'user_id': userId
                    }
                };

                const result = await axios(options);
                const quiz = result.data.quiz;
                
                let arr = [];

                quiz.questions.forEach((quizQuestion, index) => {
                    let question = {};
                    
                    if(quizQuestion.question_type === 'fill_blank' || quizQuestion.question_type === 'free_response') {
                        question = {
                            questionType: quizQuestion.question_type,
                            questionText: quizQuestion.question_text,
                            questionAnswer: quizQuestion.question_type === 'fill_blank' ? quizQuestion.answers[0].key_text : ''
                        }
                    }
                    else if (quizQuestion.question_type === 'multiple_choice') {
                        let mcAnswers = {
                            answer1: '',
                            answer2: '', 
                            answer3: '', 
                            answer4: '',
                            answer5: ''
                        };
                        let correctMCAnswers = {
                            answer1: false,
                            answer2: false,
                            answer3: false,
                            answer4: false, 
                            answer5: false
                        };

                        quizQuestion.answers.forEach((answer, index) => 
                            {
                                mcAnswers[`answer${index+1}`] = answer.key_text;
                                correctMCAnswers[`answer${index+1}`] = answer.is_correct === 1 ? true : false;
                            }
                        );

                        question = {
                            questionType: quizQuestion.question_type,
                            questionText: quizQuestion.question_text,
                            questionAnswer: mcAnswers,
                            correctQuestionAnswers: correctMCAnswers
                        }
                    }

                    arr.push(question);
                });

                console.log(arr);
                setQuiz({ 
                    ['title']: quiz.title, 
                    ['description']: quiz.description, 
                    ['alertValue']: quiz.threshold, 
                    ['hasAlertValue']: quiz.threshold === '' ? false : true,
                    ['questions']: arr,
                });
            }
            getFormDetails();
        }
    }, [formId]);
    
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
        getClasses();
    }, []);

    // event handlers
    const handleModificationParameters = (parameters, values) => {
        const tempParams = {...modificationParameters};
        parameters.forEach((parameter, idx) => {
            tempParams[parameter] = values[idx];
        });
        
        setModificationParameters({...tempParams});
    };

    const handleAddQuestion = () => {
        setAddQuestionOpen(true);
    };

    const handleQuizTitleChange = event => {
        setQuiz({ ...quiz, ['title']: event.target.value });
    };

    const handleQuizDescriptionChange = event => {
        setQuiz({ ...quiz, ['description']: event.target.value });
    };

    const handleClassChange = event => {
        setSelectedClass(event.target.value);
    };

    const addQuestion = (type, text, fillBlankAnswer, mcAnswers, correctMCAnswers) => {
        let question = {};
        if (type === 'fill_blank' || type === 'free_response') {
            question = {
                questionType: type, 
                questionText: text,
                questionAnswer: type === 'fill_blank' ? fillBlankAnswer : ''
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

        let arr = quiz['questions'];
        arr = arr.concat(question);
        setQuiz({ ...quiz, ['questions']: arr })
    };

    const deleteQuestion = (shouldDelete) => {
        if(shouldDelete) {
            let arr = [...quiz['questions']]; // make a copy of our state
            arr.splice(modificationParameters.indexToModify, 1);
            setQuiz({ ...quiz, ['questions']: arr })
        }
    };

    const editQuestion = (shouldEdit, type, text, fillBlankAnswer, mcAnswers, correctMCAnswers) => {
        if(shouldEdit) {
            let question = {};
            if (type === 'free_response' || type === 'fill_blank') {
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

            let arr = quiz['questions'];
            arr[modificationParameters.indexToModify] = question;

            setQuiz({ ...quiz, ['questions']: arr })
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
            [true, index, quiz['questions'][index]]
        );
    };

    const handleInstanceChange = event => {
        setInstanceType(event.target.value);
    };

    const handleAssigneeChange = event => {
        setAssignee(event.target.value);
    };

    const handleStartDateTimeChange = dateTime => {
        let formattedDateTime = formatDate(dateTime);
        setStartDateTime(formattedDateTime);
    };

    const handleEndDateTimeChange = dateTime => {
        let formattedDateTime = formatDate(dateTime);
        setEndDateTime(formattedDateTime);
    };

    const handleHasAlertValue = event => {
        setQuiz({ ...quiz, ['hasAlertValue']: event.target.checked });
    };

    const handleAlertvalue = event => {
        setQuiz({ ...quiz, ['alertValue']: event.target.value });
    };

    const handleCloseFormCreatedDialog = () => {
        setFormCreated(false)
    };

    async function createForm() {
        let questionsArr = [];

        quiz['questions'].forEach((question, index) => {
            let questionObj = {
                "question_text": null,
                "question_type": null,
                "answers": []
            };

            questionObj.category_id = 2;
            questionObj.question_text = question.questionText;
            questionObj.question_type = question.questionType;
           
            if (question.questionType === 'fill_blank') {
                questionObj.answers.push({
                    "answer_text" : question.questionAnswer, 
                    "isCorrect" : 1
                });
            }
            else if (question.questionType === 'multiple_choice') {
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
            'form_threshold': quiz['alertValue'], 
            "type": 'quiz',
            "access_level": userType,
            "user_id": userId,
            "title": quiz['title'],
            "description": quiz['description'],
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

        setFormCreated(true);
    };

    
    return (
        <Fragment>
            <Typography variant="h4" className={classes.pageTitle}>Create a New Quiz</Typography>
            <form className={classes.quizTitle} noValidate autoComplete="off">
                <TextField
                    error={quiz['title'] === '' ? true : false} 
                    helperText={quiz['title'] === '' ? "Quiz Title is required." : ''} 
                    label="Quiz Title" 
                    variant="outlined" 
                    fullWidth={true}
                    value={quiz['title']}
                    onChange={handleQuizTitleChange}
                />
            </form>
            <form className={classes.quizTitle} noValidate autoComplete="off">
                <TextField
                    label="Quiz Description"
                    variant="outlined"
                    fullWidth={true}
                    value={quiz['description']}
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
                                {classList.map((classItem, index) => 
                                    
                                    <MenuItem key={index} value={classItem.class_id}>{classItem.name}</MenuItem>
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
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <FormControllabel className={classes.checkBox}
                    control={
                        <Checkbox 
                            checked={quiz['hasAlertValue']}
                            onChange={handleHasAlertValue}
                            color='primary'
                        />
                    }
                    label="Receive Alerts?"
                />
                {quiz['hasAlertValue'] && 
                    <form className={classes.quizDetails} noValidate autoComplete='off'>
                        <TextField 
                            label='Value from 0 - 100'
                            variant='outlined'
                            onChange={handleAlertvalue}
                            value={quiz['alertValue']}
                        />
                    </form>
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
                    {quiz['questions'].map((question, index) => 
                        <Grid item xs={4} key={index}>
                            <Card className={classes.questionCard} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.questionTitle} color="textSecondary" gutterBottom>
                                        {question.questionType === 'free_response' && 'Free Response'}
                                        {question.questionType === 'fill_blank' && 'Fill in the blank'}
                                        {question.questionType === 'multiple_choice' && 'Multiple Choice'}
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
            {formCreated && <FormCreated 
                open={formCreated}
                onClose={() => handleCloseFormCreatedDialog()}
                confirmationText={`${quiz['title']} ${instanceType} created!`}
                createdText='Quiz Created'
                start={instanceType === 'instance' ? startDateTime : ''}
                end={instanceType === 'instance' ? endDateTime : ''}
                assignedClass={instanceType === 'instance' ? classList[selectedClass].name : ''}
                alertGrade={quiz['alertValue']}
                routeBack='/coordinator/CreateQuiz'
            />}
        </Fragment>
    );
}

export default NewQuiz;
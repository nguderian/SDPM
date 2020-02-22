import React, { useState } from 'react';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

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
        display: 'flex',
        flexDirection: 'row',
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
    }
}));

const NewForm = ({ user_id, userType, token, loggedIn }) => {
    console.log(userType);
    const classes = useStyles();
    const [addQuestionOpen, setAddQuestionOpen] = useState(false);
    const [formName, setFormName] = useState('');
    const [questions, setQuestions] = useState([]);
    const [classForForm, setClassForForm] = useState('sd1');
    const [modificationParameters, setModificationParameters] = useState({
        deleteQuestionOpen: false,
        editQuestionOpen: false,
        indexToModify: null,
        questionToModify: null,
    });

    const handleModificationParameters = (parameters, values) => {
        console.log(parameters, values);
        const tempParams = {...modificationParameters};
        parameters.forEach((parameter, idx) => {
            tempParams[parameter] = values[idx];
        });
        
        console.log(tempParams);
        setModificationParameters({...tempParams});
    };

    // event handlers
    const handleClickOpen = () => {
        setAddQuestionOpen(true);
    };

    const handleTextFieldChange = event => {
        setFormName(event.target.value);
    };

    const handleClassChange = event => {
        setClassForForm(event.target.value);
    };

    const addQuestion = (type, text, frqAnswer, threshold, mcAnswers, correctMCAnswers) => {
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

    const createForm = () => {
        let arr = [];

        questions.forEach((question, index) => {
            let obj = {};
            obj["question_category_id"] = question.questionType;
            obj["question_text"] = question.questionText;

            if (question.questionType === 'Free Response' || question.questionType === 'Likert Scale') {
                obj["answers"] = [{ "answer_Text" : question.questionAnswer, 
                                    "is_correct" : question.questionAnswer === '' ? 0 : 1
                                }]
            }
            else {
                obj["answers"]
            }
            
            arr.concat(obj);
        });

        let body = {
            "title": formName,
            "class": classForForm,
            "user_id": user_id,
            questions: arr
        }
    };

    
    return (
        <div>
            <Typography variant="h4" className={classes.pageTitle}>Create a New Form</Typography>
            <form className={classes.formTitle} noValidate autoComplete="off">
                <TextField id="outlined-basic" 
                    error={formName === '' ? true : false} 
                    helperText={formName === '' ? "Form name is required." : ''} 
                    label="Form Name" 
                    variant="outlined" 
                    fullWidth={true} 
                    onChange={handleTextFieldChange}
                />
            </form>
            <div className={classes.formDetail}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose Class</FormLabel>
                    <RadioGroup aria-label="class" value={classForForm} onChange={handleClassChange}>
                        <FormControlLabel value="sd1" control={<Radio />} label="SD1" />
                        <FormControlLabel value="sd2" control={<Radio />} label="SD2" />
                    </RadioGroup>
                </FormControl>
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
                                        {question.questionType}
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
        </div>
    );
}

export default NewForm


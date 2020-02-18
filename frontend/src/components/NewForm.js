import React, { useState, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NewQuestion from './NewQuestion';


const useStyles = makeStyles(theme => ({
    formTitle: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    createButton: {
        margin: theme.spacing(1),
        textAlign: 'center',
    },
    dataTable: {
        width: 200,
    },
    root: {
        flexGrow: 1
    },
    questionCard: {
        minWidth: 275,
        margin: theme.spacing(2)
    },
    title: {
        fontSize: 14
    }
}));

const NewForm = () => {
    const classes = useStyles();
    const [addQuestionOpen, setAddQuestionOpen] = useState(false);
    const [formName, setFormName] = useState('');
    const [questions, setQuestions] = useState([]);

    // event handlers
    const handleClickOpen = () => {
        setAddQuestionOpen(true);
    };

    const handleTextFieldChange = event => {
        setFormName(event.target.value);
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

    const deleteQuestion = (index) => {
        let arr = [...questions]; // make a copy of our state
        // console.log(arr);
        arr.splice(index, 1);
        // console.log(arr);
        setQuestions(arr);
    };

    return (
        <div>
            <form className={classes.formTitle} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Form Name" variant="outlined" fullWidth={true} onChange={handleTextFieldChange}/>
            </form>
            <Button className={classes.createButton} variant="contained" color="primary" onClick={handleClickOpen}>
                Add Question 
            </Button>
            {addQuestionOpen && <NewQuestion 
                open={addQuestionOpen} 
                onClose={() => setAddQuestionOpen(false)}
                add={addQuestion}
                />}
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {questions.map((question, index) => 
                        <Grid item xs={4} key={index}>
                            <Card className={classes.questionCard}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {question.questionType}
                                    </Typography>
                                    <Typography>{question.questionText}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button 
                                        variant="contained"
                                        startIcon={<EditIcon />}>
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteQuestion(index)}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </div>
        </div>
    );
}

export default NewForm


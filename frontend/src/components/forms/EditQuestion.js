import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EditLikert from './questions/EditLikert';
import EditMultipleChoice from './questions/EditMultipleChoice';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 300,
    },
    questionInput: {
        marginTop: theme.spacing(1)
    }
}));


const EditQuestion = ({ open, onClose, editQuestion, question }) => {
    const classes = useStyles();
    const [questionType, setQuestionType] = useState(question.questionType);
    const [questionText, setQuestionText] = useState(question.questionText);
    const [threshold, setThreshold] = useState(question.questionType === 2 ? question.questionAnswer : '');
    const [isCorrectMCAnswer, setIsCorrectMcAnswer] = React.useState(question.questionType === 1 ? question.correctQuestionAnswers : {
        answer1: false,
        answer2: false,
        answer3: false,
        answer4: false, 
        answer5: false
    });
    const [mcAnswers, setMCAnswers] = React.useState(question.questionType === 1 ? question.questionAnswer : {
        answer1: '',
        answer2: '', 
        answer3: '', 
        answer4: '',
        answer5: ''
    });
    
    // event handlers
    const handleCancel = () => {
        onClose();
        editQuestion(false, question);
    };

    const handleConfirm = () => {
        onClose();
        editQuestion(true, questionType, questionText, threshold, mcAnswers, isCorrectMCAnswer)
    };

    const storeThreshold = value => {
        if (value !== null) {
            setThreshold(value);
        }
    };

    // event handlers
    const handleQuestionTypeChange = event => {
        setQuestionType(event.target.value);
    };

    const handleQuestionTextChange = event => {
        setQuestionText(event.target.value);
    };

    const storeCorrectMCAnswers = (answerChoice, isCorrect) => {
        setIsCorrectMcAnswer({ ...isCorrectMCAnswer, [answerChoice]: isCorrect });
    };

    const storeMCAnswers = (answerChoice, value) => {
        if(value !== null) {
            setMCAnswers({ ...mcAnswers, [answerChoice]: value});
        }
    };

    return (
        <Fragment>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Question</DialogTitle>
                <DialogContent>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>
                            Question Type
                        </InputLabel>
                        <Select 
                            label="Question Type"
                            value={questionType}
                            onChange={handleQuestionTypeChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={3}>Free Response</MenuItem>
                            <MenuItem value={1}>Multiple Choice</MenuItem>
                            <MenuItem value={2}>Likert Scale</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        className={classes.questionInput}
                        autoFocus
                        id="name"
                        label="Enter Question Text"
                        fullWidth
                        defaultValue={questionText}
                        onChange={handleQuestionTextChange}
                    />
                    {questionType === 1 && <EditMultipleChoice possibleAnswers={storeMCAnswers} correctAnswers={storeCorrectMCAnswers} question={question}/>}
                    {questionType === 2 && <EditLikert thresholdValue={storeThreshold} question={question}/>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default EditQuestion;
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
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NewFillBlank from './NewFillBlank';
import NewMultipleChoice from './NewMultipleChoice';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 300,
    },
    questionInput: {
        marginTop: theme.spacing(1)
    }
}));


const NewQuestion = ({ open, onClose, add }) => {
    const classes = useStyles();
    const [questionType, setQuestionType] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [fillBlankAnswer, setFillBlankAnswer] = useState('');
    const [isCorrectMCAnswer, setIsCorrectMcAnswer] = useState({
        answer1: false,
        answer2: false,
        answer3: false,
        answer4: false, 
        answer5: false
    });
    const [mcAnswers, setMCAnswers] = useState({
        answer1: '',
        answer2: '', 
        answer3: '', 
        answer4: '',
        answer5: ''
    });
    
    // event handlers
    const handleQuestionTypeChange = event => {
        setQuestionType(event.target.value);
    };

    const handleCancel = () => {
        onClose();
    };

    const handleConfirm = () => {
        onClose();
        add(questionType, questionText, fillBlankAnswer, mcAnswers, isCorrectMCAnswer);
    };

    const handleQuestionTextChange = event => {
        setQuestionText(event.target.value);
    };

    const storeFillBlankAnswer = value => {
        setFillBlankAnswer(value);
    };
    
    const storeCorrectMCAnswers = (answerChoice, isCorrect) => {
        setIsCorrectMcAnswer({ ...isCorrectMCAnswer, [answerChoice]: isCorrect });
    };

    const storeMCAnswers = (answerChoice, value) => {
        setMCAnswers({ ...mcAnswers, [answerChoice]: value});
    };

    return (
        <Fragment>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
                <DialogTitle id="form-dialog-title">Add Question</DialogTitle>
                <DialogContent>
                    <FormControl variant="outlined" className={classes.formControl} error={questionType === '' ? true : false}>
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
                            <MenuItem value={'free_response'}>Free Response</MenuItem>
                            <MenuItem value={'multiple_choice'}>Multiple Choice</MenuItem>
                            <MenuItem value={'fill_blank'}>Fill in the blank</MenuItem>
                        </Select>
                        {questionType === '' ? <FormHelperText error>Question Type is Required</FormHelperText> : null}
                    </FormControl>
                    <TextField
                        className={classes.questionInput}
                        id="name"
                        label="Enter Question Text"
                        fullWidth
                        error={questionText === '' ? true : false} 
                        helperText={questionText === '' ? "Question text is required" : ''}
                        multiline={true}
                        onChange={handleQuestionTextChange}
                    />
                    {questionType === 'multiple_choice' && <NewMultipleChoice possibleAnswers={storeMCAnswers} correctAnswers={storeCorrectMCAnswers} />}
                    {questionType === 'fill_blank' && <NewFillBlank fillBlank={storeFillBlankAnswer}/>}
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

NewQuestion.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired
}

export default NewQuestion;
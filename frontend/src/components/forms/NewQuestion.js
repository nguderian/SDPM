import React, { useState, Fragment, useRef } from 'react';
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
import NewFreeResponse from './questions/NewFreeResponse';
import NewLikert from './questions/NewLikert';
import NewMultipleChoice from './questions/NewMultipleChoice';
import AlertDialog from '../AlertDialog';

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
    const [frqAnswers, setFrqAnswers] = useState('');
    const [threshold, setThreshold] = useState('');
    const [isCorrectMCAnswer, setIsCorrectMcAnswer] = React.useState({
        answer1: false,
        answer2: false,
        answer3: false,
        answer4: false, 
        answer5: false
    });
    const [mcAnswers, setMCAnswers] = React.useState({
        answer1: '',
        answer2: '', 
        answer3: '', 
        answer4: '',
        answer5: ''
    });
    const [openAlertDialog, setOpenAlertDialog] = useState('false');
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    // event handlers
    const handleQuestionTypeChange = event => {
        setQuestionType(event.target.value);
    };

    const handleCancel = () => {
        onClose();
    };

    const handleAlertDialog = () => {
        setOpenAlertDialog(false);
    };

    const handleConfirm = () => {
        // if(questionType === null) {
        //     // render alert dialog with appropriate text
        //     setOpenAlertDialog(true);
        //     return (
        //         <AlertDialog open={openAlertDialog} onClose={handleAlertDialog} alertMessage="You must choose a question type"/>
        //     )
        // }
        // else if(questionText === '') {
            
        // }
        // else if(questionType === 'Free Response')

        onClose();
        add(questionType, questionText, frqAnswers, threshold, mcAnswers, isCorrectMCAnswer);
    };

    const handleQuestionTextChange = event => {
        setQuestionText(event.target.value);
    };

    const storeFRQAnswers = answers => {
        setFrqAnswers(answers);
    };

    const storeThreshold = value => {
        setThreshold(value);
    };
    
    const storeCorrectMCAnswers = (answerChoice, isCorrect) => {
        setIsCorrectMcAnswer({ ...isCorrectMCAnswer, [answerChoice]: isCorrect });
    };

    const storeMCAnswers = (answerChoice, value) => {
        setMCAnswers({ ...mcAnswers, [answerChoice]: value});
    };

    return (
        <Fragment>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Question</DialogTitle>
                <DialogContent>
                    <FormControl variant="outlined" className={classes.formControl} error={questionType === '' ? true : false}>
                        <InputLabel ref={inputLabel} id="Question Type">
                            Question Type
                        </InputLabel>
                        <Select variant = 'standard'
                            labelId="Question Type"
                            id="Question Selector"
                            value={questionType}
                            onChange={handleQuestionTypeChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={3}>Free Response</MenuItem>
                            <MenuItem value={1}>Multiple Choice</MenuItem>
                            <MenuItem value={2}>Likert Scale</MenuItem>
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
                        onChange={handleQuestionTextChange}
                    />
                    {questionType === 3 && <NewFreeResponse possibleAnswers={storeFRQAnswers}/>}
                    {questionType === 1 && <NewMultipleChoice possibleAnswers={storeMCAnswers} correctAnswers={storeCorrectMCAnswers}/>}
                    {questionType === 2 && <NewLikert thresholdValue={storeThreshold}/>}
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

export default NewQuestion;
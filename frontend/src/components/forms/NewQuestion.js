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
import Select from '@material-ui/core/Select';
import NewFreeResponse from './NewFreeResponse';
import NewLikert from './NewLikert';
import NewMultipleChoice from './NewMultipleChoice';

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

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    // event handlers
    const handleChange = event => {
        setQuestionType(event.target.value);
    };

    const handleCancel = () => {
        onClose();
    };

    const handleConfirm = () => {
        onClose();
        add(questionType, questionText, frqAnswers, threshold, mcAnswers, isCorrectMCAnswer);
    };

    const handleTextFieldChange = event => {
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
            <Dialog open={openModal} onClose={handleConfirm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Question</DialogTitle>
                <DialogContent>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} id="Question Type">
                            Question Type
                        </InputLabel>
                        <Select variant = 'standard'
                            labelId="Question Type"
                            id="Question Selector"
                            value={questionType}
                            onChange={handleChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Free Response'}>Free Response</MenuItem>
                            <MenuItem value={'Multiple Choice'}>Multiple Choice</MenuItem>
                            <MenuItem value={'Likert Scale'}>Likert Scale</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        className={classes.questionInput}
                        autoFocus
                        id="name"
                        label="Enter Question Text"
                        fullWidth
                        onChange={handleTextFieldChange}
                    />
                    {questionType === 'Free Response' && <NewFreeResponse possibleAnswers={storeFRQAnswers}/>}
                    {questionType === 'Multiple Choice' && <NewMultipleChoice possibleAnswers={storeMCAnswers} correctAnswers={storeCorrectMCAnswers}/>}
                    {questionType === 'Likert Scale' && <NewLikert thresholdValue={storeThreshold}/>}
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
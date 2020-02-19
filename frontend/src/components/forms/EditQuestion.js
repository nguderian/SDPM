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
import EditFreeResponse from './questions/EditFreeResponse';
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
    const handleCancel = () => {
        onClose();
        editQuestion(false, question);
    };

    const handleConfirm = () => {
        let newQuestion = {};
        editQuestion(true, newQuestion)
    };

    const storeFRQAnswers = answers => {
        setFrqAnswers(answers);
    };

    const storeThreshold = value => {
        setThreshold(value);
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
        setMCAnswers({ ...mcAnswers, [answerChoice]: value});
    };
    return (
        <div>
            {console.log(question)}
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Question</DialogTitle>
                <DialogContent>
                    <FormControl variant="outlined" className={classes.formControl}>
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
                        defaultValue={question.questionText}
                        onChange={handleQuestionTextChange}
                    />
                    {questionType === 'Free Response' && <EditFreeResponse possibleAnswers={storeFRQAnswers} question={question}/>}
                    {questionType === 'Multiple Choice' && <EditMultipleChoice possibleAnswers={storeMCAnswers} correctAnswers={storeCorrectMCAnswers} question={question}/>}
                    {questionType === 'Likert Scale' && <EditLikert thresholdValue={storeThreshold} question={question}/>}
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
        </div>
    );
}

export default EditQuestion;
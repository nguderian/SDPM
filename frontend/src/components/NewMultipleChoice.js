import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { 
    Typography, 
    FormControl, 
    FormGroup, 
    FormControlLabel, 
    Checkbox, 
    TextField  
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    helperText: {
      marginTop: theme.spacing(2),
    },
    checkBox: {
        marginTop: theme.spacing(1)
    }
}));

const NewMultipleChoice = () => {
    const classes = useStyles();
    const [answerIsCorrect, setAnswerIsCorrect] = React.useState({
        answer1IsCorrect: false,
        answer2IsCorrect: false,
        answer3IsCorrect: false,
        answer4IsCorrect: false, 
        answer5IsCorrect: false
    });

    const [answers, setAnswers] = React.useState({
        answer1: '',
        answer2: '', 
        answer3: '', 
        answer4: '',
        answer5: ''
    });

    // event handlers
    const handleCheckBoxChange = answerChoice => event => {
        setAnswerIsCorrect({ ...answerIsCorrect, [answerChoice]: event.target.checked });
    };

    const handleTextFieldChange = answerChoice => event => {
        setAnswers({ ...answers, [answerChoice]: event.target.value });
    };

    // destructure
    const { 
        answer1IsCorrect, 
        answer2IsCorrect, 
        answer3IsCorrect, 
        answer4IsCorrect, 
        answer5IsCorrect } = answerIsCorrect;

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography className={classes.helperText}>Check off correct answers</Typography>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer1IsCorrect} className={classes.checkBox} onChange={handleCheckBoxChange('answer1IsCorrect')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer1" label="Enter Answer" variant="outlined" fullWidth onChange={handleTextFieldChange('answer1')}/>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer2IsCorrect} className={classes.checkBox} onChange={handleCheckBoxChange('answer2IsCorrect')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer2" label="Enter Answer" variant="outlined" fullWidth onChange={handleTextFieldChange('answer2')}/>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer3IsCorrect} className={classes.checkBox} onChange={handleCheckBoxChange('answer3IsCorrect')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer3" label="Enter Answer" variant="outlined" fullWidth onChange={handleTextFieldChange('answer3')}/>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer4IsCorrect} className={classes.checkBox} onChange={handleCheckBoxChange('answer4IsCorrect')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer4" label="Enter Answer" variant="outlined" fullWidth onChange={handleTextFieldChange('answer4')}/>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer5IsCorrect} className={classes.checkBox} onChange={handleCheckBoxChange('answer5IsCorrect')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer5" label="Enter Answer" variant="outlined" fullWidth onChange={handleTextFieldChange('answer5')}/>
                </Grid>
            </Grid>
            {console.log(answers)}
        </div>
        
    );
}


export default NewMultipleChoice;
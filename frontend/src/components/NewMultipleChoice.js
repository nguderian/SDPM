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
    const [answer, setAnswer] = React.useState({
        answer1: false,
        answer2: false,
        answer3: false,
        answer4: false, 
        answer5: false
    });

    const handleChange = answerChoice => event => {
        setAnswer({ ...answer, [answerChoice]: event.target.checked });
    };

    const { answer1, answer2, answer3, answer4, answer5 } = answer;

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography className={classes.helperText}>Check off correct answers</Typography>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer1} className={classes.checkBox} onChange={handleChange('answer1')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer1" label="Enter Answer" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer2} className={classes.checkBox} onChange={handleChange('answer2')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer2" label="Enter Answer" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer3} className={classes.checkBox} onChange={handleChange('answer3')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer3" label="Enter Answer" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer4} className={classes.checkBox} onChange={handleChange('answer4')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer4" label="Enter Answer" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer5} className={classes.checkBox} onChange={handleChange('answer5')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer5" label="Enter Answer" variant="outlined" fullWidth/>
                </Grid>
            </Grid>
        </div>
        
    );
}


export default NewMultipleChoice;
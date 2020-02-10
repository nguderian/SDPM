import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FormControl, FormGroup, FormControlLabel, Checkbox, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }, 
    formControl: {
        marginTop: theme.spacing(1),
        width: '100%'
    }
}));


const NewLikert = () => {
    const classes = useStyles();
    const [hasThreshold, setHasThreshold] = React.useState(false);
    const [threshold, setThreshold] = React.useState('');

    const handleCheckboxChange = event => {
        setHasThreshold(event.target.checked);
    };

    const handleTextFieldChange = event => {
        setThreshold(event.target.value);
    };

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={hasThreshold} onChange={handleCheckboxChange} value="hasThreshold"/>}
                        label="Is there a threshold?"
                    />
                </FormGroup>
                {hasThreshold && <TextField
                    label="Threshold"
                    placeholder="Enter threshold value"
                    variant="outlined"
                    onChange={handleTextFieldChange}
                />}
            </FormControl>
        </div>
    );
}


export default NewLikert;
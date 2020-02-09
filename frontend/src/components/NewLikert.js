import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FormControl, FormGroup, FormControlLabel, Checkbox, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }, 
    formControl: {
        margin: theme.spacing(1),
        width: '100%'
    }
}));


const NewLikert = () => {
    const classes = useStyles();
    const [hasThreshold, setHasThreshold] = React.useState(false);

    const handleChange = event => {
        setHasThreshold(event.target.checked);
    }

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={hasThreshold} onChange={handleChange} value="hasThreshold"/>}
                        label="Is there a threshold?"
                    />
                </FormGroup>
                {hasThreshold && <TextField
                    label="Threshold"
                    placeholder="Enter threshold value"
                    variant="outlined"
                />}
            </FormControl>
        </div>
    );
}


export default NewLikert;
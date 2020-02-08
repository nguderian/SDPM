import React, { useState, Fragment, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
    formTitle: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));

const NewForm = () => {
    const classes = useStyles();
    const [questionType, setQuestionType] = useState('')

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        setQuestionType(event.target.value);
    };
    return (
        <Fragment>
            <form className={classes.formTitle} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Form Name" variant="outlined" fullWidth={true}/>
            </form>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} id="Question Type">
                    Question Type
                </InputLabel>
                <Select
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
        </Fragment>
    );
}

export default NewForm


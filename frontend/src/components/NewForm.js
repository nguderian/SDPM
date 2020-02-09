import React, { useState, Fragment, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import NewQuestion from './NewQuestion';

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
    },
    createButton: {
        margin: theme.spacing(1),
        textAlign: 'center',
    },
}));

const NewForm = () => {
    const classes = useStyles();
    // const [questionType, setQuestionType] = useState('');

    // const inputLabel = useRef(null);
    // const [labelWidth, setLabelWidth] = React.useState(0);
    const [addQuestionOpen, setAddQuestionOpen] = useState(false);

    const handleClickOpen = () => {
        setAddQuestionOpen(true);
        // console.log(open);
    };

    return (
        <Fragment>
            <form className={classes.formTitle} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Form Name" variant="outlined" fullWidth={true}/>
            </form>
            <Button className={classes.createButton} variant="contained" color="primary" onClick={handleClickOpen}>
                Add Question 
            </Button>
            {addQuestionOpen && <NewQuestion open={addQuestionOpen} onClose={() => setAddQuestionOpen(false)}/>}
            
        </Fragment>
    );
}

export default NewForm


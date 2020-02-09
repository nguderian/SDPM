import React, { useState, Fragment, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core';
import OutlinedInput from "@material-ui/core/OutlinedInput";
const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    }
}));


const NewQuestion = ({ open, onClose }) => {
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(open);
    const [questionType, setQuestionType] = useState('');

    //const inputLabel = useRef(null);
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    // componentDidMount() {(
    //     setLabelWidth(ReactDOM.findDOMNode(inputLabel.current.offsetWidth))
    // )};
    React.useEffect(() => {
    // setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        setQuestionType(event.target.value);
    };

    const handleClose = () => {
        setOpenModal(false);
        onClose();
    };

    

    return (
        <Fragment>
            <Dialog open={openModal} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default NewQuestion;
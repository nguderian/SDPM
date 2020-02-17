import React, { useState, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import Search from '@material-ui/icons/Search';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Clear from '@material-ui/icons/Clear';
import AddBox from '@material-ui/icons/AddBox';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import NewQuestion from './NewQuestion';

const useStyles = makeStyles(theme => ({
    formTitle: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    createButton: {
        margin: theme.spacing(1),
        textAlign: 'center',
    },
    dataTable: {
        width: 200,
    }
}));

const NewForm = () => {
    const classes = useStyles();
    const [addQuestionOpen, setAddQuestionOpen] = useState(false);
    const [formName, setFormName] = useState('');
    const [questions, setQuestions] = useState([]);
    
    // table values - partial duplicate of [questions]
    const [tableColumns, setTableColumns] = React.useState([
        { title: 'Question Type', field: 'questionType' },
        { title: 'Question Text', field: 'questionText' },
    ]);
    const [tableData, setTableData] = React.useState([]);

    const tableIcons = {
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
    };

    // event handlers
    const handleClickOpen = () => {
        setAddQuestionOpen(true);
    };

    const handleTextFieldChange = event => {
        setFormName(event.target.value);
    };

    const addQuestion = (type, text, frqAnswer, threshold, mcAnswers, correctMCAnswers) => {
        let question = {};
        let tableQuestion = {
            questionType: type, 
            questionText: text,
        };

        if (type === 'Free Response' || type === 'Likert Scale') {
            question = {
                questionType: type, 
                questionText: text,
                questionAnswer: frqAnswer === '' ? threshold : frqAnswer
            }
        }
        else {
            question = {
                questionType: type,
                questionText: text,
                questionAnswer: mcAnswers,
                correctQuestionAnswers: correctMCAnswers
            }
            
        }
        setQuestions(questions.concat(question));
        setTableData(tableData.concat(tableQuestion));
    };

    return (
        <div>
            <form className={classes.formTitle} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Form Name" variant="outlined" fullWidth={true} onChange={handleTextFieldChange}/>
            </form>
            <Button className={classes.createButton} variant="contained" color="primary" onClick={handleClickOpen}>
                Add Question 
            </Button>
            {addQuestionOpen && <NewQuestion 
                open={addQuestionOpen} 
                onClose={() => setAddQuestionOpen(false)}
                add={addQuestion}
                />}
            
            <MaterialTable
                icons={tableIcons}
                title="Editable Example"
                columns={tableColumns}
                data={tableData}
                className={classes.dataTable}
                editable={{
                    onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                        resolve();
                        setTableData(prevState => {
                            const data = [...prevState.data];
                            data.push(newData);
                            return { ...prevState, data };
                        });
                        }, 600);
                    }),
                    onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                        resolve();
                        if (oldData) {
                            setTableData(prevState => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                            });
                        }
                        }, 600);
                    }),
                    onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                        resolve();
                        setTableData(prevState => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                        });
                        }, 600);
                    }),
                }}
            />
        </div>
    );
}

export default NewForm


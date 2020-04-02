import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NewQuestion from './questions/NewQuestion';
import DeleteQuestion from './questions/DeleteQuestion';
import EditQuestion from './questions/EditQuestion';
// import FormOrTemplateCreated from '../FormOrTemplateCreated';
import FormControl from '@material-ui/core/FormControl';
import FormControllabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns'
import { 
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers/';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    surveyTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    surveyDetails: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        minWidth: 250
    },
    divider: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }, 
    createButton: {
        margin: theme.spacing(1),
        textAlign: 'center',
        marginTop: theme.spacing(2),
    },
    questionCard: {
        minWidth: 275,
        margin: theme.spacing(1)
    },
    studentList: {
        flexGrow: 1,
        maxHeight: 300,
        overflow: 'auto'
    },
    questionTitle: {
        fontSize: 14
    },
}));

const NewSurvey = ({ userId, userType, token, loggedIn }) => {
    const classes = useStyles();
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyDescription, setSurveyDescription] = useState('');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function getClasses() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getAllClasses',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }, 
                data: {
                    'user_id': userId
                } 
            };

            const result = await axios(options);

            setClassList(result.data);
        }
        getClasses()
    }, []);

    useEffect(() => {
        if(selectedClass) {
            async function getTeams() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getTeamsInClass',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'class_id': selectedClass
                    }
                };
    
                const result = await axios(options);
                console.log(result);
                setTeams(result.data);
            }
            getTeams()
        }
    }, [selectedClass]);

    useEffect(() => {
        if(selectedTeam) {
            async function getTeamMembers() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getTeamMembers',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhbnZpciIsImlhdCI6MTU4NDQ5OTEwNiwiZXhwIjoxNTg3MDkxMTA2fQ.smBUubIYJmf7Zefbr2pWf-wl-Uoqnmh598DA4IYnhfE'
                    },
                    data: {
                        'team_id': selectedTeam
                    }
                }
                
                const result = await axios(options);
                console.log(result);
                setTeamMembers(result.data.team_members)
            }
            getTeamMembers()
        }
    }, [selectedTeam]);

    // useEffect(() => {
    //     if(teamMembers) {
    //         function createQuestions() {
    //             let questions = [];
    //             teamMembers.map((teamMember, index) => 
    //                 questions.push({
    //                     'question_text': `Participation grade ${teamMember.first_name}?`,
    //                     'question_type': 'likert',
    //                     'question_threshold': 3
    //                 })
    //             )
    //             console.log(questions);
    //             setQuestions(questions);
    //         }
    //         createQuestions()
    //     }
    // }, [teamMembers]);

    const handleSurveyTitleChange = event => {
        setSurveyTitle(event.target.value);
    };

    const handleSurveyDescriptionChange = event => {
        setSurveyDescription(event.target.value);
    };

    const handleClassChange = event => {
        setSelectedClass(event.target.value);
    };

    const handleTeamChange = event => {
        setSelectedTeam(event.target.value);
    };

    async function createSurvey() {
        let questionsArr = [];
    };

    return (
        <Fragment>
            <Typography variant="h4" className={classes.pageTitle}>Create a New Peer Review</Typography>
            <form className={classes.surveyTitle} noValidate autoComplete="off">
                <TextField
                    error={surveyTitle === '' ? true : false} 
                    helperText={surveyTitle === '' ? "Peer Review Title is required." : ''} 
                    label="Peer Review Title" 
                    variant="outlined" 
                    fullWidth={true} 
                    onChange={handleSurveyTitleChange}
                />
            </form>
            <form className={classes.surveyTitle} noValidate autoComplete="off">
                <TextField
                    label="Peer Review Description"
                    variant="outlined"
                    fullWidth={true}
                    onChange={handleSurveyDescriptionChange}
                />
            </form>

            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <FormControl variant='outlined' className={classes.surveyDetails}>
                    <InputLabel>Class</InputLabel>
                    <Select
                        label="Class"
                        value={selectedClass}
                        onChange={handleClassChange}
                    >   
                        {classList.map((classItem, index) => 
                            <MenuItem key={index} value={classItem.class_id}>{classItem.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl variant='outlined' className={classes.surveyDetails}>
                    <InputLabel>Teams</InputLabel>
                    <Select
                        label="Team"
                        value={selectedTeam}
                        onChange={handleTeamChange}
                    >   
                        {teams.map((team, index) => 
                            <MenuItem key={index} value={team.team_id}>{team.project_name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>

            <Divider className={classes.divider}/>
            
            <div classname={classes.studentList}>
                <Grid container spacing={3}>
                    {teamMembers.map((teamMember, index) =>
                        <Grid item xs={4} key={index}>
                            <Card className={classes.questionCard} variant='outlined'>
                                <CardContent>
                                    <Typography classname={classes.questionTitle} color='textSecondary' gutterBottom>
                                        {`${teamMember.first_name}  ${teamMember.last_name}`}
                                    </Typography>
                                    <Typography>{`Participation grade ${teamMember.first_name}?`}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </div>
            <Button 
                variant='contained'
                color='primary'
                onClick={createSurvey}
                className={classes.createButton}>
                Create Peer Review
            </Button>
        </Fragment>
    )
}

export default NewSurvey;
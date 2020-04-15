import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'; 
import FormSubmitted from '../../common/FormSubmitted';
import Slider from '@material-ui/core/Slider';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    surveyDetail: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    submitButton: {
        textAlign: 'center',
        marginTop: theme.spacing(2)
    },
    prCard: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    prCards: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        margin: '0 auto',
        border: '1px solid gray',
        borderRadius: '5px',
        marginTop: theme.spacing(2),
        flexGrow: 1,
        maxHeight: '70%',
        overflowY: 'scroll'
    },
    slider: {
        width: '60%',
        marginTop: theme.spacing(5),
    },
    progress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '25%'
    },
}));

function isEmpty(obj) {
    for (var key in obj) {
        if(obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};

const TakePR = ({ userId, token, location }) => {
    const classes = useStyles();
    const { pr, studentId } = location.state;
    const [teamData, setTeamData] = useState({});
    const [teamMembers, setTeamMembers] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        async function getTeam() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getTeamID',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {
                    'student_id': studentId
                },
            };

            let result = await axios(options);
            setTeamData(result.data);
        }
        getTeam()
    }, [studentId, token]);

    useEffect(() => {
        if(!isEmpty(teamData)) {
            async function getTeamMembers() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getTeamMembers',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'team_id': teamData[0].team_id
                    },
                };
                
                let result = await axios(options);
                setTeamMembers(result.data.team_members);
            }
            getTeamMembers()
        }
    }, [teamData, token]);

    useEffect(() => {
        if(teamMembers.length !== 0) {
            async function getQuiz() {
                const options = {
                    method: 'POST', 
                    url: 'http://localhost:3001/api/getForm', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }, 
                    data: {
                        'form_id': pr.form_id,
                        'user_id': userId
                    }
                };
                const result = await axios(options);
                const survey = result.data.survey;

                let arr = [];
                
                teamMembers.forEach(teamMember => {
                    let obj = {
                        question_id: survey.questions[0].question_id,
                        answer_text: '2',
                        student_id: teamMember.student_id
                    }
                    arr.push(obj);
                });

                setQuizAnswers(arr);
            }
            getQuiz();
        }
        
    }, [teamMembers, token, userId, pr]);

    const handleParticipationGrade = (index, event, value) => {
        quizAnswers[index].answer_text = value;
        setQuizAnswers({ ...quizAnswers })
    };

    const handleCloseSubmittedDialog = () => {
        setSubmitted(true);
    };

    async function submitPr() {
        const body = {
            'form_id': pr.form_id,
            'instance_id': pr.instance_id,
            'student_id': studentId,
            'results': quizAnswers, 
            'user_id': userId
        };
        
        const options = {
            method: 'POST', 
            url: 'http://localhost:3001/api/submitForm',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }, 
            data: body
        };

        let response = await axios(options);
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        let success = true;
        if(responseOK) {
            success = success && true;
        }
        else {
            success = success && false;
        }

        setSubmitted(success);
    };

    return (
        quizAnswers.length === 0 ? 
        <div className={classes.progress}>
            <CircularProgress />
        </div> :
        <Fragment>
            <Typography variant="h4" className={classes.pageTitle}>{pr.title}{teamData.project_name}</Typography>

            <form className={classes.surveyDetail} noValidate autoComplete='off'>
                <TextField 
                    disabled
                    variant='outlined'
                    value={pr.description}
                    multiline={true}
                    fullWidth
                />
            </form>
            
            <div className={classes.prCards}>
                {teamMembers.map((teamMember, index) => 
                    <Card variant='outlined' key={index} className={classes.prCard}>
                        <CardContent>
                            <Typography>{`${teamMember.first_name}  ${teamMember.last_name}`}</Typography>
                            <Typography>Participation Grade?</Typography>
                            <Slider
                                className={classes.slider}
                                defaultValue={2}
                                valueLabelDisplay='on'
                                step={1}
                                marks
                                min={1}
                                max={10}
                                onChange={(event, value) => handleParticipationGrade(index, event, value)}
                            />
                        </CardContent>
                    </Card>
                )}
            </div>
            <div className={classes.submitButton}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={submitPr}
                >
                    Submit
                </Button>
            </div>

            {submitted && <FormSubmitted 
                open={submitted}
                onClose={() => handleCloseSubmittedDialog()}
                confirmationText={`${pr.title} submitted!`}
                submittedText='Peer Review Submitted'
                routeBack='/student/PeerReview/ViewPeerReviews'
            />}
        </Fragment>
    )
}

export default TakePR;
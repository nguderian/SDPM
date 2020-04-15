import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'; 
import FormSubmitted from '../../common/FormSubmitted';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    }, 
    meetingDetail: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    meetingCard: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    meetingCards: {
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
    checkBox: {
        marginTop: theme.spacing(2),
    },
    submitButton: {
        textAlign: 'center',
        marginTop: theme.spacing(2)
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

const TakeAttendance = ({ token, location }) => {
    const classes = useStyles();
    const { meeting, studentId } = location.state;
    const [teamData, setTeamData] = useState({});
    const [attendance, setAttendance] = useState({
        teamMembers: [],
        didAttend: []
    });
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
    }, [token, studentId]);

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
                const teamMembers = result.data.team_members;

                let arr = [];
                console.log(teamMembers);
                teamMembers.forEach(teamMember => {
                    let obj = {
                        student_id: teamMember.student_id,
                        did_attend: 0,
                        reason: ''
                    }
                    arr.push(obj);
                });
                
                setAttendance({ teamMembers: teamMembers, didAttend: arr });
            }
            getTeamMembers()
        }
    }, [teamData, token]);

    const captureDidAttend = (event, index) => {
        attendance.didAttend[index].did_attend = ~~event.target.checked;
        attendance.didAttend[index].reason = '';
        setAttendance({ ...attendance })
    };

    const captureAbsenceReason = (event, index) => {
        attendance.didAttend[index].reason = event.target.value;
        setAttendance({ ...attendance })
    };

    const handleCloseSubmittedDialog = () => {
        setSubmitted(false);
    };
    
    async function submitMeeting() {
        const body = {
            'instance_id': meeting.instance_id,
            'users': attendance.didAttend
        }

        const options = {
            method: 'POST', 
            url: 'http://localhost:3001/api/takeAttendance',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }, 
            data: body
        }

        console.log(options);
        let response = await axios(options);
        console.log(response);
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        let success = true;
        if(responseOK) {
            success = success && true;
            console.log('form Submitted!');
        }
        else {
            success = success && false;
            console.log('something went wrong');
        }

        setSubmitted(success);
    };


    return (
        attendance.teamMembers.length === 0 ? 
        <div className={classes.progress}>
            <CircularProgress />
        </div> :
        <Fragment>
            <Typography variant="h4" className={classes.pageTitle}>{meeting.title}</Typography>

            <form className={classes.meetingDetail} noValidate autoComplete='off'>
                <TextField
                    disabled
                    variant='outlined'
                    value={meeting['description']}
                    multiline={true}
                    fullWidth={true}
                />
            </form>

            <div className={classes.meetingCards}>
                {attendance.teamMembers.map((teamMember, index) => 
                    <Card variant='outlined' key={index} className={classes.meetingCard}>
                        <CardContent>
                            <Typography>{`${teamMember.first_name}  ${teamMember.last_name}`}</Typography>

                            <FormControlLabel className={classes.checkBox}
                                control={
                                    <Checkbox 
                                        checked={attendance.didAttend[index].did_attend === 1 ? true : false}
                                        onChange={(event) => captureDidAttend(event, index)}
                                        color='primary'
                                    />
                                }
                                label='Did attend?'
                            />

                            <form>
                                <TextField 
                                    disabled={attendance.didAttend[index].did_attend === 1 ? true : false }
                                    variant='outlined'
                                    fullWidth={true}
                                    label='Reason for not attending'
                                    value={attendance.didAttend[index].reason}
                                    onChange={(event) => captureAbsenceReason(event, index)}
                                />
                            </form>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className={classes.submitButton}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={submitMeeting}
                >
                    Submit
                </Button>
            </div>

            {submitted && <FormSubmitted 
                open={submitted}
                onClose={() => handleCloseSubmittedDialog()}
                confirmationText={`Attendance taken on ${meeting.title}`}
                submittedText='Attendance Taken'
                routeBack='/student/Meeting/ViewMeetings'
            />}
        </Fragment>
    )
}

export default TakeAttendance;


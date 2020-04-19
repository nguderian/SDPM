import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'; 
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    goBack: {
        textAlign: 'center',
        marginTop: theme.spacing(2)
    },
    progress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '25%'
    },
    times: {
        textAlign: 'center'   
    },
    timeText: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }
}));

const SubmittedMeeting = ({ token, location }) => {
    const classes = useStyles();
    const { instanceId } = location.state;
    const [meeting, setMeeting] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        users: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getAttendance() {
            const options = {
                method: 'POST', 
                url: 'http://localhost:3001/api/getAttendance', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }, 
                data: {
                    'instance_id': instanceId
                }
            };
            
            const result = await axios(options);
            
            setMeeting({
                title: result.data.title,
                description: result.data.description,
                startDate: result.data.start_date,
                endDate: result.data.end_date,
                users: result.data.users
            });
        }
        async function stopLoading() {
            setIsLoading(false);
        }
        getAttendance();
        stopLoading();
    }, [token, instanceId]);

    return (
        isLoading ?
        <div className={classes.progress}>
            <CircularProgress />
        </div> : 
        <Fragment>
            <Typography variant='h4' className={classes.pageTitle}>{meeting.title}</Typography>
            <form className={classes.meetingDetail} noValidate autoComplete='off'>
                <TextField
                    disabled
                    variant='outlined'
                    value={meeting.description}
                    multiline={true}
                    fullWidth={true}
                />
            </form>

            <div className={classes.times}>
                <Typography variant='h6' className={classes.timeText}>Start:</Typography>
                <form noValidate autoComplete='off'>
                    <TextField
                        disabled
                        variant='outlined'
                        value={meeting.startDate}
                    />
                </form>
                <Typography variant='h6' className={classes.timeText}>End:</Typography>
                <form noValidate autoComplete='off'>
                    <TextField
                        disabled
                        variant='outlined'
                        value={meeting.endDate}
                    />
                </form>
            </div>

            <div className={classes.meetingCards}>
                {meeting.users.map((user, index) => 
                    <Card variant='outlined' key={index} className={classes.meetingCard}>
                        <CardContent>
                            <Typography>{user.first_name} {user.last_name}</Typography>

                            <FormControlLabel className={classes.checkBox}
                                control={
                                    <Checkbox 
                                        checked={user.did_attend === 1 ? true : false}
                                        disabled
                                        color='primary'
                                    />
                                }
                                label='Did attend?'
                            />
                            <form>
                                <TextField 
                                    disabled
                                    variant='outlined'
                                    fullWidth
                                    label='Reason for not attending'
                                    value={user.reason}
                                />
                            </form>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className={classes.goBack}>
                <Button
                    variant='contained'
                    color='primary'
                    component={Link}
                    to='/student/Meeting/ViewMeetings'
                >
                    Go to meetings
                </Button>
            </div>
        </Fragment>
    );
}

SubmittedMeeting.propTypes = {
    token: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
}

export default SubmittedMeeting;
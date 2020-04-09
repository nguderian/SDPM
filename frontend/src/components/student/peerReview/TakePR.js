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
import Slider from '@material-ui/core/Slider';
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
    }
}));

const TakePR = ({ userId, userType, token, loggedIn, location }) => {
    const classes = useStyles();
    const { pr, studentId } = location.state;
    const [teamId, setTeamId] = useState('');
    const [prDetails, setPrDetails] = useState({
        teamMembers: []
    });

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
            console.log(result.data.team_id[0].team_id);
            setTeamId(result.data.team_id[0].team_id);
        }
        getTeam()
    }, []);

    useEffect(() => {
        if(teamId) {
            async function getTeamMembers() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getTeamMembers',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'team_id': teamId
                    },
                };
                
                let result = await axios(options);
                setPrDetails({ ...prDetails, teamMembers: result.data.team_members })
            }
            getTeamMembers()
        }
    }, [teamId]);

    async function submitPr() {
        console.log(prDetails);
    };

    return (
        <Fragment>
            {console.log(prDetails)}
            <Typography variant="h4" className={classes.pageTitle}>{pr.title}</Typography>

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
                {prDetails.teamMembers.map((teamMember, index) => 
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
        </Fragment>
    )
}

export default TakePR;
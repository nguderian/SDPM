import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'; 
import Slider from '@material-ui/core/Slider';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
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
    goBack: {
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
        width: '40%',
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

const SubmittedSurvey = ({ userId, token, location }) => {
    const classes = useStyles();
    const { instanceId } = location.state;
    const [pr, setPr] = useState({
        title: '',
        description: '',
        questions: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getInstance() {
            const options = {
                method: 'POST', 
                url: 'http://localhost:3001/api/getInstance', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }, 
                data: {
                    'user_id': userId,
                    'instance_id': instanceId
                }
            };
           
            const result = await axios(options);
            
            const survey = result.data;
            setPr({
                title: survey.title,
                description: survey.description,
                questions: survey.questions
            });
        }
        async function stopLoading() {
            setIsLoading(false);
        }
        getInstance();
    }, [token, instanceId, userId]);

    return (
        isLoading ? 
        <div className={classes.progress}>
            <CircularProgress />
        </div> :
        <Fragment>
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
                {pr.questions[0].answers.map((answer, index) => 
                    <Card variant='outlined' key={index} className={classes.prCard}>
                        <CardContent>
                            <Typography>{answer.first_name} {answer.last_name}</Typography>
                            <Typography>{pr.questions[0].question_text}</Typography>
                            <Slider 
                                className={classes.slider}
                                defaultValue={parseInt(answer.answer_text)}
                                valueLabelDisplay='on'
                                step={1}
                                marks
                                min={1}
                                max={10}
                                disabled
                            />
                        </CardContent>
                        
                    </Card>
                )}
            </div>

            <div className={classes.goBack}>
                <Button
                    variant='contained'
                    color='primary'
                    component={Link}
                    to='/student/PeerReview/ViewPeerReviews'
                >
                    Go to peer reviews
                </Button>
            </div>
        </Fragment>
    );
}

SubmittedSurvey.propTypes = {
    token: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
}

export default SubmittedSurvey;
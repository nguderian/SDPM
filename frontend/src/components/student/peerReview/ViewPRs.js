import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CompleteForm from '../../common/CompleteForm';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    classSelector: {
        marginLeft: theme.spacing(7),
        marginBottom: theme.spacing(2), 
        minWidth: '15%'
    },
    detailText: {
        marginLeft: theme.spacing(7),
        marginBottom: theme.spacing(2)
    },
    prCard: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    prList: {
        flexGrow: 1,
        maxHeight: '40%',
        overflowY: 'scroll',
        border: '1px solid gray',
        borderRadius: '5px',
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7), 
        marginBottom: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: theme.spacing(2)
    }
}));

const ViewPRs = ({ userId, userType, token, loggedIn }) => {
    const classes = useStyles();
    const [upcomingPrs, setUpcomingPrs] = useState([]);
    const [completedPrs, setCompletedPrs] = useState([]);
    const [activeClasses, setActiveClasses] = useState([]);
    const [inactiveClasses, setInactiveClasses] = useState([]);
    const [activeStudentId, setActiveStudentId] = useState('');
    const [inactiveStudentId, setInactiveStudentId] = useState('');
    const [prToShow, setPrToShow] = useState({
        showPr: false,
        prAtIndex: {}
    });

    useEffect(() => {
        async function getActiveClasses() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getAllClasses',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {
                    'user_id': userId,
                    'is_active': 1
                },
            };

            let result = await axios(options);
            console.log(result);
            setActiveClasses(result.data);
        }
        async function getInactiveClasses() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getAllClasses',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {
                    'user_id': userId,
                    'is_active': 0
                },
            };

            let result = await axios(options);
            setInactiveClasses(result.data);
        }
        getActiveClasses();
        getInactiveClasses();
    }, [token, userId]);

    useEffect(() => {
        if(activeStudentId) {
            async function getUpcomingPrs() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getInstances',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'student_id': activeStudentId,
                        'type': 'survey',
                        'is_complete': 0
                    }
                };
        
                let result = await axios(options);
                console.log(result);
                setUpcomingPrs(result.data);
            }
            async function getCompletedPrs() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getInstances',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'student_id': activeStudentId,
                        'type': 'meeting',
                        'is_complete': 1
                    }
                };
        
                let result = await axios(options);
                console.log(result);
                setCompletedPrs(result.data);
            }
            getUpcomingPrs();
            getCompletedPrs();
        }
    }, [activeStudentId, token]);

    const handleActiveClassChange = event => {
        setActiveStudentId(event.target.value);   
    };

    const handleInactiveClassChange = event => {
        setInactiveStudentId(event.target.value);
    };

    const handlePrCardClick = (index, type) => {
        if(type === 'upcoming') {
            setPrToShow({ showPr: true, prAtIndex: upcomingPrs[index] });
        }
        else if(type === 'completed') {
            setPrToShow({ showPr: true, prAtIndex: completedPrs[index] });
        }
    };

    return (
        <Fragment>
            <Typography variant="h4" className={classes.pageTitle}>Group Peer Reviews</Typography>
            <Divider className={classes.divider} variant="fullWidth"/>

            <div className={classes.options}>
                <FormControl variant='outlined' className={classes.classSelector}>
                    <InputLabel>Select current class</InputLabel>
                    <Select
                        label='Current Class'
                        value={activeStudentId}
                        onChange={handleActiveClassChange}
                    >
                        {activeClasses.map((activeClass, index) => 
                            <MenuItem key={index} value={activeClass.student_id}>{activeClass.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl variant='outlined' className={classes.classSelector}>
                    <InputLabel>Select previous class</InputLabel>
                    <Select
                        label='Current Class'
                        value={inactiveStudentId}
                        disabled={inactiveClasses.length === 0 ? true : false}
                        onChange={handleInactiveClassChange}
                    >
                        {inactiveClasses.map((inactiveClass, index) => 
                            <MenuItem key={index} value={inactiveClass.student_id}>{inactiveClass.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
            

            <Typography className={classes.detailText} variant='h5'>Upcoming</Typography>
            <div className={classes.prList}>
                <List component='nav'>
                    {upcomingPrs.length === 0 &&
                        <Card variant='elevation' className={classes.prCard}>
                            <CardContent>
                                <Typography>No upcoming peer reviews. Please select a class</Typography>
                            </CardContent>
                        </Card>
                    }
                    {upcomingPrs.map((pr, index) => 
                        <Card variant='outlined' key={index} className={classes.prCard}>
                            <CardActionArea onClick={() => handlePrCardClick(index, 'upcoming')}>
                                <CardContent>
                                    <Typography color='textSecondary' gutterBottom>
                                        {pr.title}
                                    </Typography>
                                    <Typography>{pr.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )}
                    
                </List>
            </div>
            
            <Typography className={classes.detailText} variant='h5'>Completed</Typography>
            <div className={classes.prList}>
                <List component='nav'>
                    {completedPrs.length === 0 &&
                        <Card variant='elevation' className={classes.prCard}>
                            <CardContent>
                                <Typography>No completed peer reviews. Please select a class</Typography>
                            </CardContent>
                        </Card>
                    }
                    {completedPrs.map((pr, index) => 
                        <Card variant='outlined' key={index} className={classes.prCard}>
                            <CardActionArea onClick={() => handlePrCardClick(index, 'completed')}>
                                <CardContent>
                                    <Typography color='textSecondary' gutterBottom>
                                        {pr.title}
                                    </Typography>
                                    <Typography>{pr.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )}
                    
                </List>
            </div>
            
            {prToShow.showPr && <CompleteForm 
                open={prToShow.showPr}
                onClose={() => setPrToShow({ showPr: false, prAtIndex: {} })}
                formTitle={prToShow.prAtIndex.title}
                formDescription={prToShow.prAtIndex.description}
                buttonText='Complete Peer Review'
                routeForward={{
                    pathname: `/student/PeerReview/${prToShow.prAtIndex.title}`,
                    state: {
                        pr: prToShow.prAtIndex,
                        studentId: activeStudentId === '' ? inactiveStudentId : activeStudentId
                    }
                }}
            />}
        </Fragment>
    )
}

export default ViewPRs;
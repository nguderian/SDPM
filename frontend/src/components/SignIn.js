import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthActions from '../storeConfig/actions/auth/AuthActions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }, 
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    }, 
    inputData: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submitButton: {
        margin: theme.spacing(3,0,2)
    }
}));

const SignIn = ({ userId, userType, token, loggedIn }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    console.log('loggedIn', loggedIn);

    useEffect(() => {
        if(loggedIn) {
            history.push('/Home');
        }
    })
    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    async function login(event) {
        event.preventDefault();
        console.log(username, password);
        dispatch(AuthActions.login(username, password));
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.wrapper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h5' variant='h5'>
                    Sign In
                </Typography>
                <form className={classes.inputData} noValidate>
                    <TextField 
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Username'
                        autoFocus
                        error={username === ''}
                        helperText={username === '' ? 'Username is required' : ''}
                        onChange={handleUsernameChange}
                    />
                    <TextField 
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        type='password'
                        label='Password'
                        error={password === ''}
                        helperText={password === '' ? 'Password is required' : ''}
                        onChange={handlePasswordChange}
                    />
                    <FormControlLabel 
                        control={<Checkbox color='primary'/>}
                        label='Remember me'
                    />
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submitButton}
                        onClick={login}
                        disabled={username === '' || password === ''}
                    >
                        Sign In
                    </Button>
                    <Grid container='spacing'>
                        <Grid item xs>
                            <Link variant='body2'>
                                Forgot Password?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default SignIn;
import React, { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: 'black'
    },
}));

const StyledNav = withStyles({
  colorPrimary: {
    'background-color': '#ffc904'
  }
})(AppBar);

const NavBar = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <StyledNav position="static" classname={classes.root}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="black" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="black">Login</Button>
                </Toolbar>
            </StyledNav> 
        </Fragment>
    )
}

export default NavBar;
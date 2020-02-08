import React, { Fragment, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ClassIcon from '@material-ui/icons/Class';
import SettingsIcon from '@material-ui/icons/Settings';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
    list: {
        width: 250,
    },
}));

const StyledNav = withStyles({
  colorPrimary: {
    'background-color': '#ffc904'
  }
})(AppBar);

const NavBar = ({ user_id, userType, token, loggedIn }) => {
    const classes = useStyles();
    const logged = loggedIn;

    // console.log(user_id, loggedIn, userType);


    const [state, setState] = useState({
      left: false
    });

    const toggleDrawer = (side, open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key == 'Shift')) {
          return;
      }

      setState({ ...state, [side]: open });
    };

    const getIcon = text => {
      if(text === 'Home'){
        return <HomeIcon/>
      }
      if(text === 'Class'){
        return <ClassIcon/>
      }
      if(text === 'Assignments'){
        return <AssignmentIcon/>
      }
      if(text === 'Settings'){
        return <SettingsIcon/>
      }
    };

    const sideList = side => {
      if(logged && userType === 'student') {
        return (
          <Fragment
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
          >
            <List>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon/>
                  <ListItemText primary={'Home'}/>
                </ListItemIcon>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ClassIcon/>
                  <ListItemText primary={'Class'}/>
                </ListItemIcon>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AssignmentIcon/>
                  <ListItemText primary={'Assignments'}/>
                </ListItemIcon>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon/>
                  <ListItemText primary={'Settings'}/>
                </ListItemIcon>
              </ListItem>
            </List>
          </Fragment>
        )
      }
      else {
        return (
          <Fragment
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
          >
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{getIcon(text)}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Fragment>
        )
      }
    }
 
    return (
      <Fragment>
          <StyledNav position="static" classname={classes.root}>
              <Toolbar>
                  <IconButton edge="start" className={classes.menuButton} color="black" aria-label="menu" onClick={toggleDrawer('left', true)}>
                      <MenuIcon />
                  </IconButton>
                  <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                      {sideList('left')}
                  </Drawer>
                  <Typography variant="h6" className={classes.title}>
                      Senior Design Project Manager
                  </Typography>
                  <Button color="black">Logout</Button>
              </Toolbar>
          </StyledNav> 
      </Fragment>
    )
}

export default NavBar;
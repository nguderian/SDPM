import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ClassIcon from '@material-ui/icons/Class';
import SettingsIcon from '@material-ui/icons/Settings';
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RateReviewIcon from '@material-ui/icons/RateReview';

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
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
      }

      setState({ ...state, [side]: open });
    };

    const sideList = side => {
      if(logged && userType === 'student') {
        return (
          <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
          >
            <List>

              <ListItem button component={Link} to='/'>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary='Home'/>
              </ListItem>

              <ListItem button component={Link} to='/'>
                <ListItemIcon><ClassIcon/></ListItemIcon>
                <ListItemText primary='Class'/>
              </ListItem>

              <ListItem button component={Link} to='/student/Quiz/ViewQuizzes'>
                <ListItemIcon><AssignmentIcon/></ListItemIcon>
                <ListItemText primary='Assignments'/>
              </ListItem>

              <ListItem button component={Link} to='/student/Meeting/ViewMeetings'>
                <ListItemIcon><ScheduleIcon/></ListItemIcon>
                <ListItemText primary='Meetings'/>
              </ListItem>
  
              <ListItem button component={Link} to='/student/PeerReview/ViewPeerReviews'>
                <ListItemIcon><RateReviewIcon/></ListItemIcon>
                <ListItemText primary='Group Peer Review'/>
              </ListItem>

              <ListItem button component={Link} to='/'>
                <ListItemIcon><SettingsIcon/></ListItemIcon>
                <ListItemText primary='Settings'/>
              </ListItem>
              
            </List>
          </div>
        )
      }
      else {
        return (
          <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
          >
            <List>
            
              <ListItem button component={Link} to='/'>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary='Home'/>
              </ListItem>
              <ListItem button component={Link} to='/coordinator/ViewClasses'>
                <ListItemIcon><ClassIcon/></ListItemIcon>
                <ListItemText primary='Class'/>
              </ListItem>
              
              <ListItem button component={Link} to='/coordinator/Quiz/CreateQuiz'>
                <ListItemIcon><AssignmentIcon/></ListItemIcon>
                <ListItemText primary='Create Quiz'/>
              </ListItem>

              <ListItem button component={Link} to='/coordinator/Survey/CreateSurvey'>
                <ListItemIcon><RateReviewIcon/></ListItemIcon>
                <ListItemText primary='Create Peer Review'/>
              </ListItem>

              <ListItem button component={Link} to='/'>
                <ListItemIcon><SearchIcon/></ListItemIcon>
                <ListItemText primary='Search Forms'/>
              </ListItem>

              <ListItem button component={Link} to='/Settings'>
                <ListItemIcon><SettingsIcon/></ListItemIcon>
                <ListItemText primary='Settings'/>
              </ListItem>

            </List>
          </div>
        )
      }
    }
 
    return (
      <div>
          <StyledNav position="static" className={classes.root}>
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
      </div>
    )
}

export default NavBar;
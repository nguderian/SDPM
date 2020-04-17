import React, { Fragment, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import ReactDOM from "react-dom";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  classSelector: {
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(0), 
    minWidth: '30%'
},
}));

export default function MaterialTableDemo({ userId, userType, token, loggedIn }) {
  const classes = useStyles();
  const [classList, setClassList] = useState([]);
  const [currentClass,setCurrentClass] = useState('');
  const [studentList, setStudentList] = useState([]);
  const [classAlerts, setClassAlerts] = useState([]);
  const history = useHistory();
  const [columns, setColumns] = useState([
    { title: 'First Name', field: 'first_name' },
    { title: 'Last Name', field: 'last_name' },
    { title: 'Group', field: 'project_name', type: 'numeric' },
  ]);
  const [alertColumns, setAlertColumns] = useState([
    { title: 'First Name', field: 'first_name' },
    { title: 'Last Name', field: 'last_name' },
    { title: 'Group', field: 'project_name', type: 'numeric' },
    { title: 'Alert From', field: 'title'},
  ]);

  useEffect(() => {
    async function getAllClasses() {
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
        setClassList(result.data);
    }
    getAllClasses();
}, []);

useEffect(() => {
  if(currentClass){
    async function getAllStudents() {
        const options = {
            method: 'POST',
            url: 'http://localhost:3001/api/getStudentsInClass',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
              'class_id': currentClass
            },
        };

        let result = await axios(options);
        setStudentList(result.data);
    }
    getAllStudents();
  }
}, [currentClass]);

useEffect(() => {
  if(currentClass){
    async function getClassAlerts() {
        const options = {
            method: 'POST',
            url: 'http://localhost:3001/api/getUserAlertsForClass',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
              'user_id': userId,
              'class_id': currentClass,
              'is_viewed': 0
            },
        };

        let result = await axios(options);
        setClassAlerts(result.data);
    }
    getClassAlerts();
  }
}, [currentClass]);

  const handleClassChange = event => {
    setCurrentClass(event.target.value);  
};
  /*function handleRowClick(data) {
    // history.push('/coordinator/Alert/ViewAlert/${alert.title}', {state: {
    //   formId: quizToShow.quizAtIndex.form_id, 
    //   instanceId: quizToShow.quizAtIndex.instance_id, 
    //   studentId: activeStudentId === '' ? inactiveStudentId : activeStudentId
    // }});
    console.log(data)
  }*/

  const handleRowClick = (event, rowData) => {
    console.log(rowData)
        history.push(`/coordinator/Alert/ViewAlert/${rowData.title}`, {
        alert: rowData
     });
  };
  return (
    <div>
    <div style={{ display: 'flex', flexDirection: 'row'}}>
    <FormControl variant='outlined' className={classes.classSelector}>
      <InputLabel>Select Class</InputLabel>
        <Select
          label='Class'
          value={currentClass}
          onChange={handleClassChange}
        >
        {classList.map((classItem, index) => 
        <MenuItem key={index} value={classItem.class_id}>{classItem.name}</MenuItem>
        )}
        </Select>
    </FormControl>
    <Button
      variant="contained"
      color="secondary">
      Upload Roster
    </Button> 
    </div>

    <div>
    <Grid container spacing={0}>
    <Grid item xs>
    <MaterialTable
      icons = {tableIcons}
      title="Student/Group Roster"
      columns={columns}
      data={studentList}

    /></Grid>


    <Grid item xs>
    <MaterialTable
      icons = {tableIcons}
      title="Notifications"
      columns={alertColumns}
      data={classAlerts}
      onRowClick={handleRowClick}
    /></Grid>
    </Grid>
    </div>
    </div>
  );
}

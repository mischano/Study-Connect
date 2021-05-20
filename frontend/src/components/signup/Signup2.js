import React, { useState} from 'react';
import '../../App.css';
import ClassAdd from './ClassAdd'
import { Button, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../actions/auth';
import { useHistory } from 'react-router-dom'
import useStyles from "./styles";
import logo from '../Assets/BLACK.png';

function Signup2() {
    const [inputList, setInputList] = useState([]);
    const [classes, setClasses] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const Classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const onAddBtnClick = event => {
        setInputList(inputList.concat(
            <Grid item>
                <ClassAdd onSubmit={event => sub(event)} key={inputList.length} />
            </Grid>));
    };

    const sub = (event) => {
        classes.push(event)
        setInputList(inputList.splice(-1))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(user.result._id, classes, history))
    };
  
    return (
        <div>
            <div style={{display: 'inline-block', width:'100%'}}><a href="/"><img id='logo' src={logo} alt='StudyConnect'></img></a></div>
            <h1 style={{textAlign:'center', margin:'auto',padding:'1em'}}>Next, tell us about your classes!</h1>
            <p style={{textAlign:'center', margin:'auto',padding:'1em'}}>Help us find your classmates and build your schedule by choosing which courses you are currently taking. </p>
            <Grid container spacing={1} justify="center" alignItems="center">
                {inputList}
            </Grid>
            <div style={{margin:'1.5em auto', padding:'1em', maxWidth: '50em'}}>
                <Button className={Classes.addClass} onClick={onAddBtnClick} style={{float:'left'}}>Add another Class</Button>
                <Button className={Classes.submit} onClick={handleSubmit} style={{float:'right'}}>
                    Continue
                </Button>
            </div>
            <Grid className="classes">
            <Grid container spacing={4} direction={'row'} justify="center" alignItems="center">
            {classes.map(course => (
                  <Card className={Classes.root} border={1}>
                     <CardContent>
                        <Grid container direction={'column'} alignItems="center">
                           <Grid item xs={4}>
                              <Typography className={Classes.title} color="textSecondary" gutterBottom>
                                 {course.department + " " + course.number}
                              </Typography>
                           </Grid>
                            <Grid item xs={5}>
                            <Typography className={Classes.title} color="textSecondary">
                                {course.startTime + "-" + course.endTime}
                            </Typography>
                            </Grid>
                            <Grid item xs={2}>
                            <Typography className={Classes.title} color="textSecondary">
                                {course.weekDays}
                            </Typography>
                            </Grid>
                        </Grid>
                     </CardContent>
                  </Card>
               ))}
               </Grid>
         </Grid>
        </div>
    )
}

export default Signup2;
import React, { useState } from 'react';
import '../../App.css';
import ClassAdd from './ClassAdd';
import { Button, Grid, Card, CardContent, Typography, Box} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { updateClasses } from '../../actions/auth';
import { useHistory } from 'react-router-dom'
import useStyles from "./styles";
import logo from '../Assets/BLACK.png';

function Signup2() {
   const [inputList, setInputList] = useState([]);
   const [classes, setClasses] = useState([]);
   const dispatch = useDispatch();
   const history = useHistory();
   const Classes = useStyles();

   const [btnDisabled, setBtnDisabled] = useState(false);
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

   // when clicking 'class add' button, concat a new class add component
   const onAddBtnClick = event => {
      setInputList(inputList.concat(
         <Grid item>
            <ClassAdd onSubmit={event => sub(event)} key={inputList.length} />
         </Grid>));
         setBtnDisabled(true);
   };

   // update the list of local classes and disable add class button
   const sub = (event) => {
      classes.push(event);
      setInputList(inputList.splice(-1, 1));
      setBtnDisabled(false);
   }

   // update the user's classes locally and in the DB
   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateClasses(user.result._id, classes, history));
   };

   //styles the left side image
   const styles = {
      container: {
         height: '100vh',
         width: '100%',
         background: "linear-gradient( rgba(0, 100, 148, 0.7), rgba(0, 100, 148, 0.7) ), url('https://images.unsplash.com/photo-1600195077077-7c815f540a3d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=936&q=80')",
         backgroundPosition: 'center',
         backgroundRepeat: 'no-repeat',
         backgroundSize: 'cover',
      },

      picture: { 
         height: '100%',
         width: '100%',
         padding: '25px'
      }
   };


   return (
      <Grid container>
         {/* Left side of screen with image and text */}
         <Grid item xs={12} md={5}>
            <div style={styles.container}>
               <div style={styles.picture}>
                  <div style={{display: 'inline-block', width:'auto'}}><a href="/"><img id='logo' src={logo} alt='StudyConnect'></img></a>
                  </div>

                  <div className= {Classes.introParagraph}>
                     <div className= {Classes.h4}>
                     <Typography variant="h4"><span style={{fontWeight: '900'}}>Finding success in numbers. </span></Typography>
                     </div>
                     <Typography>StudyConnect helps you collaborate with your classmates, give your group projects a home, and more. Get started for free today!</Typography>
                  </div>
               </div>
            </div>
         </Grid>
            
         {/* Right side of screen with log-in stuff */}
         <Grid item xs={12} md={7}>
            <div className={Classes.container}> 
               <Box pb={1.5}>
                  <div className= {Classes.heading}>
                     <Typography variant="h5"> <span style={{fontWeight: '900'}}>Next, tell us about your classes!</span></Typography>
                  </div>
                     <Typography>Help us find your classmates and build your schedule by choosing which courses you are currently taking. </Typography>
               </Box>
               
               <Grid container spacing={1} justify="center" alignItems="center">
                  {inputList}
               </Grid>

            {/* buttons */}
            <Box pb={1.5}>
            <div style={{ margin: '1.5em auto', padding: '1em 0em', maxWidth: '50em' }}>
               <Button className={Classes.addClass} disabled={btnDisabled} onClick={onAddBtnClick} style={{ float: 'left', border: '2px solid', borderColor: '#E67350'}}>Add a Class</Button>
               <Button className={Classes.continue} onClick={handleSubmit} style={{ float: 'right' }}>Continue</Button>
            </div>
            </Box>

            {/* classes */}
            <Grid className="classes">
               <Grid container direction={'row'} justify="left" alignItems="right">
                  {classes.map(course => (
                     <Card className={Classes.root} border={1}>
                        <CardContent>
                           <Grid container direction={'column'} alignItems="left">
                              <Grid item xs={4}>
                                 <Typography variant="h6" className={Classes.title} color="textSecondary" gutterBottom>
                                    {course.department + " " + course.number}
                                 </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                 <Typography className={Classes.text} color="textSecondary">
                                    {course.startTime + "-" + course.endTime}
                                 </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                 <Typography className={Classes.text} color="textSecondary">
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
         </Grid>
      </Grid>
   )
}

export default Signup2;
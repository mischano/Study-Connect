import { Grid, Typography, CardContent, CardActions, Card, makeStyles, Container } from '@material-ui/core';
import React from 'react';
import FriendsList from './FriendsList';
import '../../App.css';

const bannerTheme = {
   width: '100%',
   background: "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://blog-www.pods.com/wp-content/uploads/2020/05/SF-Neighborhoods-Feature-photo-.jpg)",
   backgroundSize: 'cover',
   padding: '2em',
}

const bannerInfoStyle = {
   direction: "row",
   justify: "center",
   alignItems: "center",
}

function fetchUser() {
   if (JSON.parse(localStorage.getItem('profile'))) {
      let user = (JSON.parse(localStorage.getItem('profile'))).result
      return user;
   } else {
      return null;
   }
}

/* update when classes route is working */
function fetchClasses() {
   let user = fetchUser();
   if (user) {
      let classes = user.classes;
      return classes;
   }
}

const useStyles = makeStyles((theme) => ({
   root: {
      minWidth: 275,
      padding: 5,
      backgroundColor: "white",
      border: "1px solid blue",
      width: "33%",
      borderRadius: 20,
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(10)
   },
   title: {
      fontSize: 25,
      color: 'blue',
      fontWeight: "fontWeightBold"
   },
   pos: {
      marginBottom: 25,
      fontSize: 20,
      color: 'blue',
      fontWeight: "fontWeightBold"
   },
}));

const Profile = () => {
   const classes = useStyles();
   let user = fetchUser();
   fetchClasses();


   return (
      <div>
         <div style={bannerTheme}>
            <Grid container style={bannerInfoStyle}>
               <div className='profileBanner' style={{ margin: 'auto' }}>
                  <h2>{user.name}</h2>
                  <h4>{user.gradDate}, {user.major}</h4>
               </div>
            </Grid>
         </div>
         <Grid className="classes">
            <h2 className="sectionHeader">Your Classes</h2>
            <Grid container spacing={4} direction={'column'} justify="space-evenly">
               {user.classes.map(course => (
                  <Card className={classes.root} border={1}>
                     <CardContent>
                        <Grid container direction={'row'}>
                           <Grid item xs={4}>
                              <Typography className={classes.title} color="textSecondary" gutterBottom>
                                 {course.department + " " + course.number}
                              </Typography>
                           </Grid>
                        <Grid item xs={5}>
                           <Typography className={classes.title} color="textSecondary">
                              {course.startTime + "-" + course.endTime}
                           </Typography>
                        </Grid>
                        <Grid item xs={2}>
                           <Typography className={classes.title} color="textSecondary">
                              {course.weekDays}
                           </Typography>
                        </Grid>
                        </Grid>
                     </CardContent>
                  </Card>
               ))}
            </Grid>
            <h2 className="sectionHeader">Your Groups</h2>
         </Grid>
         <FriendsList/>
      </div>
   );
}


export default Profile
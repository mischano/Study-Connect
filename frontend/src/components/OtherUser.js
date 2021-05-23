import React, { useEffect, useState } from 'react';
import '../App.css';
import { getUser, sendFriendReq } from '../actions/auth';
import { Button, Grid, Typography, CardContent, Card, makeStyles } from '@material-ui/core';

/*
const initialState = {
   requester: fetchUser().name,
   recipient: '',
   status: 1
}
*/

function fetchUser() {
  if (JSON.parse(localStorage.getItem('profile'))) {
     let user = (JSON.parse(localStorage.getItem('profile'))).result;
     return user;
  } else {
     return null;
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

const OtherUser = ({ match }) => {
   const [otherUser, setOtherUser] = useState(null);
   const classes = useStyles();

   const getOtherUser = async () => {
      const user = await getUser(match.params.id);
      setOtherUser(user);
   }
   const isFriend = () => {
      const user_id = getOtherUser().id;
      const friends = fetchUser().friends;

      return (user_id in friends);
   }
   /*
   const sendReq = () => {
      sendFriendReq(formData);
   }
   */

   useEffect(() => {
      getOtherUser();
   });

   return (
      <div>
         {otherUser && isFriend && (
            <>
               <h1> {otherUser.name} </h1>
               <h1> {otherUser.major}</h1>
               <h1> {otherUser.gradDate}</h1>
               <Grid className="classes">
                  <h2 className="sectionHeader">Classes</h2>
                  <Grid container spacing={4} direction={'column'} justify="space-evenly">
                     {otherUser.classes.map(course => (
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
               </Grid>
            </>
         )}
      </div>
   );
}

export default OtherUser;
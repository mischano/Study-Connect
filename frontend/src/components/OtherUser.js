import React, { useEffect, useState } from 'react';
import '../App.css';
import { getUser, removeFriend } from '../actions/auth';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { classCard } from './Cards';
import { sendFriendReq } from '../actions/friendreqs';
import { getAvailableTimes } from './ScheduleMatch';
import * as api from '../api/index';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
   const friends = fetchUser().friends;
   const dispatch = useDispatch();
   const history = useHistory();
   const user = fetchUser();

   function fetchUser() {
      if (JSON.parse(localStorage.getItem('profile'))) {
         let curUser = (JSON.parse(localStorage.getItem('profile'))).result;
         return curUser;
      } else {
         return null;
      }
   }

   useEffect(() => {
      getOtherUser();
   }, []);

   const getOtherUser = async () => {
      const other = await getUser(match.params.id);
      setOtherUser(other);
   }
   const sendReq = async () => {
      sendFriendReq({ requester: fetchUser()._id, recipient: otherUser._id, status: 1 });
   }
   const deleteFriend = async () => {
      dispatch(removeFriend(user._id, { data: otherUser._id }, history));
      api.removeFriend(otherUser._id, { data: user._id });
   }
   const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
   var weekDayIdx = 0;

   return (
      <div>
         {otherUser && (
            <>
               <h1> {otherUser.name} </h1>
               <h1> {otherUser.major}</h1>
               <h1> {otherUser.gradDate}</h1>
               <Grid container direction="row" xs={12} align="center" justify="center">
               {getAvailableTimes([fetchUser(), otherUser]).map(weekday => {
                  return (
                     <>
                     <Grid item xs={1}>
                        {weekDays[weekDayIdx++]}
                        {weekday.map(slot => {
                           return <Grid item>{slot[0] + " - " + slot[1]}</Grid>
                        })}
                     </Grid>
                     </>
                  )
               })}
               </Grid>
               {!friends.includes(otherUser._id) ?
                  <Button onClick={sendReq}>Add Friend!</Button> :
                  <Button onClick={deleteFriend}>Remove Friend!</Button>}
               <Grid className="classes">
                  <h2 className="sectionHeader">Classes</h2>
                  <Grid container spacing={4} direction={'column'} justify="space-evenly">
                     {otherUser.classes.map(course => (
                        <Grid item xs={12}>
                           {classCard(course)}
                        </Grid>
                     ))}
                  </Grid>
               </Grid>
            </>
         )}
      </div>
   );
}

export default OtherUser;
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import mongoose from 'mongoose';
import '../../App.css';
import { getUser } from '../../actions/auth';

function fetchUser() {
   if (JSON.parse(localStorage.getItem('profile'))) {
      let user = (JSON.parse(localStorage.getItem('profile'))).result;
      return user;
   } else {
      return null;
   }
}
function fetchFriends() {
   let user = fetchUser();
   if (user) {
      let friends = user.friends;
      return friends;
   }
}
const useStyles = makeStyles((theme) => ({

}));

const FriendsList = () => {
   const friends = useStyles();
   let user = fetchUser();
   fetchFriends();

   return (
      <Grid className="friends">
         <h2 className="sectionHeader">Your Friends</h2>
         <Grid container spacing={4} direction={'column'} justify="space-evenly">
            {user.friends.map(friend => (
               <h3>{getUser(friend).name}</h3>
            ))}
         </Grid>
      </Grid>
   );
}

export default FriendsList;
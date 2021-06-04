import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { getUser } from '../../actions/auth';
import { friendCard } from '../Cards'
import '../../App.css';

const FriendsList = ({ user }) => {

   const [users, setUsers] = useState([]); // Store friend profile

   /* Get friends profile */
   const getFriends = async () => {
      Promise.all(user.friends.map(async friend => {
         return getUser(friend);
      })).then(arr => setUsers(users => [...users, ...arr]))
   }

   if (users.length === 0 && user.friends.length >= 1)
      getFriends();

   return (
      <Grid container className="friends"
         spacing={1}
         direction={'row'}
         justify="flex-start"
         alignItems="stretch"
         wrap="wrap">
         {users.map(friend => {
            return (
               <Grid item xs={12} sm={6} spacing={1}>{friendCard(friend)}</Grid>
            )
         })}
      </Grid>
   );
}

export default FriendsList;
import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import '../../App.css';
import { getUser } from '../../actions/auth';
import { Link } from 'react-router-dom';

function fetchUser() {
   if (JSON.parse(localStorage.getItem('profile'))) {
      let user = (JSON.parse(localStorage.getItem('profile'))).result;
      return user;
   } else {
      return null;
   }
}

const FriendsList = () => {
   let user = fetchUser();
   const [users, setUsers] = useState([]);

   const getFriends = async () => {
      Promise.all(user.friends.map(async friend => {
         return getUser(friend);
      })).then(arr => setUsers(users => [...users, ...arr]))
   }

   if (users.length === 0 && user.friends.length >= 1)
      getFriends();

   return (
      <Grid container className="friends" justify="center" alignItems="center">
         <h2 className="sectionHeader">Your Friends</h2>
         <Grid item>
            <ul>
               {users.map(friend => {
                  return <li><Link to={`/profile/${friend._id}`} key={friend._id} >{friend.name}</Link></li>
               })}
            </ul>
         </Grid>
         <Grid container spacing={4} direction={'column'} justify="space-evenly">
         </Grid>
      </Grid>
   );
}

export default FriendsList;
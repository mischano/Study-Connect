import { Grid, Button, makeStyles } from '@material-ui/core';
import React, {useEffect, useState } from 'react';
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
   const [users, setUsers] = useState([]);

   const getFriends = async () => {
      user.friends.map(async friend => {
         await getUser(friend).then(res => { 
            setUsers(users.concat(res.name))
         })
      })
   }

   useEffect(() => {
   getFriends(); 
   }, [])

   fetchFriends();
   
   const PrintStuff = () => {
      return (
         users.forEach((name) => {
            <div style={{border: "1px solid black"}}>
               <h3> name: {name} </h3>
            </div>
         })

      );
   }
   

   return (
      <Grid container className="friends" justify="center" alignItems="center">
         <h2 className="sectionHeader">Your Friends</h2>
         <Grid item>
         <ul>
         {users.map(item => {
            console.log(item)
            return <li>{item}</li>;
         })}
      </ul>
         </Grid>
         <Grid container spacing={4} direction={'column'} justify="space-evenly">
         </Grid>
      </Grid>
   );
}

export default FriendsList;
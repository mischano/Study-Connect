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

function friendCard(props){
   const profileLink = '/profile/' + props._id;
   return(
      <a className="cardLink" href={profileLink}>
         <div className="friendCard">
            <div className='profilePhoto'></div>
            <div className="friendInfo">
               <h2>{props.name}</h2>
               <p className="subTitle">{props.gradDate}, {props.major}</p>
            </div>
         </div>
      </a>
   )
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
      <Grid container className="friends" 
      spacing={1}
      direction={'row'} 
      justify="flex-start" 
      alignItems="stretch">
         <Grid item xs={12}><h2 className="sectionHeader">Your Friends</h2></Grid>
            {users.map(friend => {
               return ( 
               <Grid item xs={12} s={4} spacing={2}>{friendCard(friend)}</Grid>
            )})}
      </Grid>
   );
}

export default FriendsList;
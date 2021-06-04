import React, { useState, useEffect } from 'react';
import { getGroup } from '../../actions/group'
import { Link } from 'react-router-dom';
import { Grid, Card } from '@material-ui/core';
import {groupCard} from '../Cards'

export default function GroupsList( {user} ) {

   const [groups, setGroups] = useState([]);
   
   //gets all of the users groups from the database, and sets the state array
   const getGroups = async () => {
      Promise.all(user.groups.map(async group => {
         return getGroup(group);
      })).then(arr => setGroups(arr));
   }

   // re-retrieve groups whenever a new group is added
   useEffect(() => {
      getGroups();
   }, [groups])


    // render the groups to the screen
   return (
      <div className="groups">
               <Grid container spacing={2}
                  direction={'row'} justify="flex-start" alignItems="stretch">
                  {groups.map(group => (
                     <Grid item xs={12} sm={6} md={3}spacing={1}>
                        {groupCard(group)}
                     </Grid>
                  ))}
               </Grid>
            </div>
   );
}
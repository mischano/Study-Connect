import React, { useState, useEffect } from 'react';
import { getGroup } from '../../actions/group'
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';

function fetchUser() {
   if (JSON.parse(localStorage.getItem('profile'))) {
      let user = (JSON.parse(localStorage.getItem('profile'))).result;
      return user;
   } else {
      return null;
   }
}

export default function GroupsList() {
   const user = fetchUser();
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

   //potential group card
   function groupCard(link, name) {
    return (
        <Link to={link}>
         <Card>
          <Card text={name}/>
         </Card>
        </Link>
    )
 }
    // render the groups to the screen
   return (
      <div>
         {groups.map((group, i) => {
            return <li key={i}>
               <Link to={`/groups/${group._id}`} key={group._id}>{group.name}</Link>
            </li>
         })}
    </div>
   );
}
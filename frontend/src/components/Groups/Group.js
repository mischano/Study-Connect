import React, { useEffect, useState } from 'react';
import '../../App.css';
import { getGroup } from '../../actions/group';
import { getUser } from '../../actions/auth';
import { Link } from 'react-router-dom';

const Group = ({ match }) => {
   const [group, setGroup] = useState(null);
   const [members, setMembers] = useState([]);

   const fetchGroup = async () => {
      const g = await getGroup(match.params.id);
      setGroup(g);
   }

   useEffect(() => {
      fetchGroup()
   }, []);

   //gets the members of the groups from database
   const getMembers = async () => {
      Promise.all(group.members.map(async mem => {
         return getUser(mem);
      })).then(arr => setMembers(mems => [...mems, ...arr]))
   }

   // call get members
   if (group !== null && group.members.length !== 0 && members.length === 0)
      getMembers();

   return (
      <div>
         {group && (
            <>
               <h1> {group.name} </h1>
               {members.map((mem, i) => {
                  return <li key={i}>
                     <Link to={`/profile/${mem._id}`} key={mem._id}>{mem.name}</Link>
                  </li>
               })}
            </>
         )}
      </div>
   );
}

export default Group;
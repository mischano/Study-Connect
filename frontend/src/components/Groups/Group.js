import React, { useEffect, useState } from 'react';
import '../../App.css';
import { getGroup } from '../../actions/group';
import {Link} from 'react-router-dom';
  
const Group = ({ match }) => {
  const [group, setGroup] = useState(null);
  
  const fetchGroup = async () => {
     const user = await getGroup(match.params.id);
     setGroup(user);
  }

  useEffect(() => 
  {
      fetchGroup();
  });

  return (
    <div>
      {group && (
        <>
          <h1> {group.name} </h1>
          {group.members.map(friend => {
            return <li> 
               <Link to={`/profile/${friend}`} key={friend._id} >{friend}</Link> 
               </li> 
         })}
         </>
          )}
      </div>
  );
}

export default Group;
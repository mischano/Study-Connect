import React, { useEffect, useState } from 'react';
import '../../App.css';
import { getUser } from '../../actions/auth';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

function fetchUser() {
   if (JSON.parse(localStorage.getItem('profile'))) {
      let user = (JSON.parse(localStorage.getItem('profile'))).result
      return user;
   } else {
      return null;
   }
}

const Groups = () => {

    return (
     <div>
        <Button>  Make a new group </Button>
        <Button> Join a group </Button>
     </div>
    );
 }
 
 export default Groups;
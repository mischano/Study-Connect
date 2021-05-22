import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import '../../App.css';
import { getUser } from '../../actions/auth';
/* eslint-disable no-use-before-define */
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function fetchUser() {
   if (JSON.parse(localStorage.getItem('profile'))) {
      let user = (JSON.parse(localStorage.getItem('profile'))).result;
      return user;
   } else {
      return null;
   }
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: 500,
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
  }));

const MakeGroup = ({handleChange}) => {
   let user = fetchUser();
   const [users, setUsers] = useState([]);
   const classes = useStyles();

   const getFriends = async () => {
      
      Promise.all(user.friends.map(async friend => {
         return getUser(friend);
      })).then(arr => setUsers(users => [...users, ...arr]))
   }
  
    useEffect(() => 
    {
        getFriends()
    }, [])

    var userList = [];
    userList = users.map(friend => friend)

   return ( 
    <div className={classes.root}>
    <Autocomplete
      multiple
      id="tags-standard"
      options={userList}
      onChange={(event, newValue) => {
        handleChange(newValue.map(friend => friend._id))
      }}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Friends"
          placeholder="Friends"
        />
      )}
    />
 </div>
   );
}

export default MakeGroup;
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MakeGroup from './MakeGroup';
import { makeGroup, getGroup } from '../../actions/group';
import { updateGroups } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const initialState = {
   name: '',
   members: []
};

function fetchUser() {
   if (JSON.parse(localStorage.getItem('profile'))) {
      let user = (JSON.parse(localStorage.getItem('profile'))).result;
      return user;
   } else {
      return null;
   }
}

export default function Groups() {
   const [open, setOpen] = React.useState(false);
   const [formData, setFormData] = useState(initialState);
   const user = fetchUser();
   const [groups, setGroups] = useState([]);

   const getGroups = async () => {
      Promise.all(user.groups.map(async group => {
         return getGroup(group);
      })).then(arr => setGroups(groups => [...groups, ...arr]));
   }

   if (groups.length === 0 && user.groups.length >= 1) {
      getGroups();
   }

   const dispatch = useDispatch();
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
      makeGroup(formData).then(res => dispatch(updateGroups(user._id, [res.data])));
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   return (
      <div>
         {groups.map((group, i) => {
            return <li key={i}>
               <Link to={`/groups/${group._id}`} key={group._id}>{group.name}</Link>
            </li>
         })}
         <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Make a new Group
      </Button>
         <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Group Form</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Enter a group name and invite your friends
          </DialogContentText>
               <TextField
                  name='name'
                  autoFocus
                  onChange={handleChange}
                  margin="dense"
                  id="name"
                  label="Group name"
                  fullWidth
               />
               <MakeGroup handleChange={e => setFormData({ ...formData, "members": e })} />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  Cancel
          </Button>
               <Button onClick={handleClose} color="primary">
                  Make Group
          </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
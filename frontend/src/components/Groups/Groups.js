import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MakeGroup from './MakeGroup';
import { makeGroup } from '../../actions/group';
import { updateGroups } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import  GroupsList from './GroupsList'
import * as api from '../../api/index';

function fetchUser() {
   if (JSON.parse(localStorage.getItem('profile'))) {
      let user = (JSON.parse(localStorage.getItem('profile'))).result;
      return user;
   } else {
      return null;
   }
}

const initialState = {
   name: '',
   members: []
};

export default function Groups() {
   const [open, setOpen] = React.useState(false);
   const [formData, setFormData] = useState(initialState);
   const user = fetchUser();
   const dispatch = useDispatch();

   const handleClickOpen = () => {
      setOpen(true);
   };

   // cancel making the group
   const handleCancel = () => {
      setOpen(false);
   };

   //submit the group
   //make a new group and updates the users list of groups
   const handleSubmit = () => {
      setOpen(false);
      makeGroup(formData).then(res => updateMembers(res.data));
   };

   // update the form data
   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const updateMembers = (group) => {
      dispatch(updateGroups(user._id, [group]))
      formData.members.forEach(mem => api.updateGroups(mem, [group]));
   }

   return (
      <div>
         <div className="topBanner">
         <h1 className="mainPageTitle" style={{marginBottom:"1em"}}> Groups </h1>
         <img className = "heroImg" style ={{margin: '2em 1em'}} src = "https://www.pinclipart.com/picdir/big/348-3485456_package-going-with-friends-flat-design-student-clipart.png" alt="A group of friends with books and backpacks."></img>
            <div className="bannerBlurb">
               <h2 id="greeting">Better together.</h2>
               <p id="studyTip">From group projects to groups of friends, this is your space to work, share, schedule, and most importantly, succeed.</p>
            </div>
          </div>
          <h2 className="sectionHeader" style={{float: 'left'}}>Your Groups</h2>
            <div className="standardButton" onClick={handleClickOpen} style={{float: 'right'}}>
                  <h3>Create New Group</h3>
            </div>
         <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
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
               <Button onClick={handleCancel} color="primary">
                  Cancel
          </Button>
               <Button onClick={handleSubmit} color="primary">
                  Make Group
          </Button>
            </DialogActions>
         </Dialog>
         <GroupsList/>
      </div>
   );
}
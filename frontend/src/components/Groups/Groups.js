import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InviteToGroup from './InviteToGroup';
import { makeGroup } from '../../actions/group';
import { updateGroups } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import GroupsList from './GroupsList'
import * as api from '../../api/index';
import GroupSearch from './GroupSearch';
import { fetchUser } from '../GetUser';

export default function Groups() {

   const [user, setUser] = useState(fetchUser())

   // intitial state for a group
   const initialState = {
      name: '',
      members: []
   };

   const [open, setOpen] = React.useState(false);
   const [formData, setFormData] = useState(initialState);
   const dispatch = useDispatch();

   // open the dialogue box
   const handleClickOpen = () => {
      setOpen(true);
   };

   // cancel making the group
   const handleCancel = () => {
      setOpen(false);
   };

   //submit the group
   //make a new group and adds members to the group
   const handleSubmit = () => {
      setOpen(false);
      const data = formData;
      data.members.push(fetchUser()._id)
      setFormData(data);
      makeGroup(formData).then(res => updateMembers(res.data));
      setFormData(initialState);
   };

   // update the form data
   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   // add the group to all of the members groups, and the user
   const updateMembers = (group) => {
      dispatch(updateGroups(user._id, [group]))
      if (formData.members.length > 1)
         formData.members.filter(mem => mem !== user._id).forEach(mem => api.updateGroups(mem, [group]));
   }

   return (
      <div>
         <GroupSearch />
         <div className="topBanner">
            <h1 className="mainPageTitle" style={{ marginBottom: "1em" }}> Groups </h1>
            <img className="heroImg" style={{ margin: '2em 1em' }} src="https://www.pinclipart.com/picdir/big/348-3485456_package-going-with-friends-flat-design-student-clipart.png" alt="A group of friends with books and backpacks."></img>
            <div className="bannerBlurb">
               <h2 id="greeting">Better together.</h2>
               <p id="studyTip">From group projects to groups of friends, this is your space to work, share, schedule, and most importantly, succeed.</p>
            </div>
         </div>

         <h2 className="sectionHeader" style={{ float: 'left' }}>Your Groups</h2>
         <div className="standardButton" onClick={handleClickOpen} style={{ float: 'right' }}>
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
               <InviteToGroup handleChange={e => setFormData({ ...formData, "members": e })} />
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
         <GroupsList user={user} />
      </div>
   );
}
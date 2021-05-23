import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MakeGroup from './MakeGroup'

const initialState = {
  name: '',
  numMembers: '',
  members: []
}; 
 
export default function Groups() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialState)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(formData.members)
    console.log(formData.name)
    console.log(formData.numMembers)
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormData({ ...formData, numMembers: 1 + formData.members.length });
  };

  return (
    <div>
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
          <MakeGroup handleChange={e => setFormData({...formData, "members": e})}/>
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
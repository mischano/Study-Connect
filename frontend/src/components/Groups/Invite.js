import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InviteToGroup from './InviteToGroup'
import useStyles from './styles';
import { updateMembers } from '../../actions/group'

export default function Invite({ group, pushMembers }) {
   const [open, setOpen] = React.useState(false);
   const [members, setMembers] = useState([])

   const classes = useStyles();

   const handleClickOpen = () => {
      setOpen(true);
   };

   //close the window without submitting anything
   const handleCancel = () => {
      setOpen(false);
   }

   //update the members of the group
   const handleSubmit = () => {
      setOpen(false);
      updateMembers(group, members)
      pushMembers(members);
   };

   return (
      <div>
         <Button variant="outlined" className={classes.invite} color="primary" onClick={handleClickOpen}>
            + Invite
      </Button>
         <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">INVITE</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Invite your friends
          </DialogContentText>
               <InviteToGroup handleChange={e => setMembers(e)} />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCancel} color="primary">
                  Cancel
          </Button>
               <Button onClick={handleSubmit} color="primary">
                  Invite
          </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
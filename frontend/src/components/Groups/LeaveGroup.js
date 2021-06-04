import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { leaveGroup } from '../../actions/auth';
import { removeMember } from '../../actions/group'
import useStyles from './styles';
import { fetchUser } from '../GetUser';

export default function LeaveGroup({ group }) {
   const [open, setOpen] = React.useState(false);

   const classes = useStyles();
   const dispatch = useDispatch();
   const history = useHistory();

   const handleClickOpen = () => {
      setOpen(true);
   };

   // update local storage and the database
   const handleSubmit = () => {
      // remove the group id from the user
      dispatch(leaveGroup(fetchUser()._id, { data: group }, history));
      // remove user from the group document
      removeMember(group, { data: fetchUser()._id });
      setOpen(false);
   }

   //close the dialogue window
   const handleCancel = () => {
      setOpen(false);
   };

   return (
      <div>
         <Button className={classes.leave} variant="outlined" color="white" onClick={handleClickOpen}>
            Leave
      </Button>
         <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to leave this group?"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  Selecting leave will remove this group from your group list
          </DialogContentText>
            </DialogContent>
            <DialogActions>
               {/*Button to cancel leave option */}
               <Button onClick={handleCancel} color="primary">
                  STAY
          </Button>
               {/*Button to confirm you want to leave the group */}
               <Button onClick={handleSubmit} color="primary" autoFocus>
                  LEAVE
          </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
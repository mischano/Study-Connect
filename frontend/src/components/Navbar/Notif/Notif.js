import React, { useState, useEffect } from 'react';
import {
   Button,
   Grid,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle
} from '@material-ui/core';
import '../../../App.css';
import FriendReqCard from './FriendReqCard';

import { getFriendReqs } from '../../../actions/friendreqs';
import { getUser } from '../../../actions/auth';

function fetchUser() {
   if (JSON.parse(localStorage.getItem('profile'))) {
      let user = (JSON.parse(localStorage.getItem('profile'))).result;
      return user;
   } else {
      return null;
   }
}

const Notif = () => {
   const [open, setOpen] = useState(false);
   const [reqs, setReqs] = useState([]);
   const [friend, setFriend] = useState(null);

   const handleClickOpen = () => {
      getReqs();
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };

   const descriptionElementRef = React.useRef(null);

   const getReqs = async () => {
      await getFriendReqs(fetchUser()._id).then(res => setReqs(res));
   }
   const getName = async (id) => {
      await getUser(id).then(res => setFriend(res.name));
   }

   useEffect(() => {
      if (open) {
         const { current: descriptionElement } = descriptionElementRef;
         if (descriptionElement !== null) {
            descriptionElement.focus();
         }
      }
   }, [open]);

   return (
      <div>
         <Button onClick={handleClickOpen}>Notifications</Button>
         <Dialog
            open={open}
            onClose={handleClose}
            scroll={'body'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
         >
            <DialogTitle id="scroll-dialog-title">Notifications</DialogTitle>
            <DialogContent dividers={'body'}>
               <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
               >
                  <Grid item container spacing={1} xs={12}>
                     {reqs.map(req => {
                        getName(req.requester);
                        return <FriendReqCard key={req._id} id={req._id} name={friend}/>;
                     })}
                  </Grid>
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  Cancel
          </Button>
               <Button onClick={handleClose} color="primary">
                  Subscribe
          </Button>
            </DialogActions>
         </Dialog>
      </div>
   )
}
export default Notif;
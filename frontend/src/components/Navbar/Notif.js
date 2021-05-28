import React, { useState, useEffect } from 'react';
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle
} from '@material-ui/core';
import '../../App.css';

import { getFriendReqs } from '../../actions/friendreqs';

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

   const handleClickOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };

   const descriptionElementRef = React.useRef(null);

   useEffect(() => {
      if (open) {
         const { current: descriptionElement } = descriptionElementRef;
         if (descriptionElement !== null) {
            descriptionElement.focus();
         }
      }
   }, [open]);

   useEffect(() => {
      fetchFriendReqs();
   }, []);

   const fetchFriendReqs = async () => {
      const allReqs = await getFriendReqs(fetchUser()._id).then(res => console.log(res));
      setReqs(allReqs);
   }

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
                  {[...new Array(50)]
                     .map(
                        () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                     )
                     .join('\n')}
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
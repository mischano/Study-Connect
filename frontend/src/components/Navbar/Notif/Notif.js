import React, { useState, useEffect } from 'react';
import {
   Button,
   Grid,
   Dialog,
   DialogContent,
   DialogContentText,
   DialogTitle
} from '@material-ui/core';
import '../../../App.css';
import FriendReqCard from './FriendReqCard';
import * as FaIcons from "react-icons/fa";
import { IconContext } from 'react-icons'

import { getFriendReqs } from '../../../actions/friendreqs';
import { getUser } from '../../../actions/auth';
import { fetchUser } from '../../GetUser';

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
         <IconContext.Provider value={{ color: '#006494', size: '20px' }}>
            <div>
               <Button onClick={handleClickOpen}><FaIcons.FaRegBell /></Button>
            </div>
         </IconContext.Provider>
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
                        return <FriendReqCard key={req._id}
                           id={req._id}
                           name={friend}
                           requester={req.requester}
                           recipient={req.recipient} />;
                     })}
                  </Grid>
               </DialogContentText>
            </DialogContent>
         </Dialog>
      </div>
   )
}
export default Notif;
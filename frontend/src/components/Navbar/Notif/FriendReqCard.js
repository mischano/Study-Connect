import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
import { Button, ButtonGroup, Avatar } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch } from 'react-redux';

import { updateFriendReq } from '../../../actions/friendreqs';
import { updateFriends } from '../../../actions/auth';

import * as api from '../../../api';

const useStyles = makeStyles({
   root: {
      boxShadow: "none",
      borderRadius: "10px",
      border: "1px solid #e8e8e8"
   }
});

const buttonTheme = createMuiTheme({
   palette: {
      primary: {
         main: '#4caf50'
      },
      secondary: {
         main: '#e91e63'
      },
   },
});

const FriendReqCard = (props) => {
   const classes = useStyles;
   const [addDecline, setAddDecline] = useState(null);
   const [message, setMessage] = useState("");
   const dispatch = useDispatch();

   const accept = () => {
      setAddDecline(true);
      dispatch(updateFriends(props.recipient, [props.requester]));
      api.updateFriends(props.requester, [props.recipient]);
      updateFriendReq(props.id, { status: 2 });
      setMessage("Request Accepted!");
   }
   const decline = () => {
      setAddDecline(false);
      updateFriendReq(props.id, { status: 3 });
      setMessage("Request Declined.");
   }

   return (
      <Grid item xs={12}>
         <Card className={classes.root}>
            <CardHeader
               avatar={
                  <Avatar src={props.avatar} aria-label="recipe" className={classes.avatar}></Avatar>
               }
               action={
                  addDecline === null && <ThemeProvider theme={buttonTheme}>
                     <ButtonGroup aria-label="settings">
                        <Button onClick={accept} variant="contained" color="#E5623B"><CheckIcon /></Button>
                        <Button onClick={decline} variant="outlined" color="#E5623B"><ClearIcon /></Button>
                     </ButtonGroup>
                  </ThemeProvider>
               }
               title={addDecline === null ? props.name : message}
            />
         </Card>
      </Grid>
   );
};

export default FriendReqCard;
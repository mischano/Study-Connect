import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'center',
      '& > *': {
         margin: '1em auto',
      },
   },
   large: {
      width: theme.spacing(16),
      height: theme.spacing(16),
      border: '0.2px solid lightgray',
   },
   orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
   },
   purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
   },
}));

export default function LetterAvatars(props) {
   const classes = useStyles();
   let name = props.props.name; // To display user initials if user image not in database

   return (
      <div className={classes.root}>
         {props.props.avatar &&  // Display avatar if it exists 
            <Avatar className={classes.large} src={props.props.avatar}>
            </Avatar>}
         {!props.props.avatar && // Display initials if avatar doesn't exist
            <Avatar className={`${classes.large} ${classes.orange}`}>
               <h1>
                  {name.split(" ")[0].charAt(0)}
                  {name.split(" ")[1] && name.split(" ")[1].charAt(0)}
               </h1>
            </Avatar>}
      </div>
   );
}

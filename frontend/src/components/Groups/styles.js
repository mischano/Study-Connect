import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
   //styles post form
   paper: {
      margin: theme.spacing(6, 0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      padding: theme.spacing(2),
      fontFamily: 'Lato',
      width: '100%',

   },

   heading: {
      paddingBottom: '10px',
   },

   root: {
      '& .MuiTextField-root': {
         margin: theme.spacing(1),
      },
   },

   form: {
      width: '100%', // Fix IE 11 issue.
      margin: theme.spacing(3, 0),
      fontFamily: 'Lato',

   },

   //makes text fields stretch to fit the paper
   field: {
      borderRadius: 25,
      width: "100%",
   },

   //button styling
   submit: {
      margin: theme.spacing(3, 0, 2),
      border: 0,
      borderRadius: 40,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      background: '#E67350',
      color: 'white',
      height: 48,
      width: '70%',
      fontWeight: 'Bold',

      '&:hover': {
         backgroundColor: '#E6592E',
         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
   },

   //button styling used for invite and join group 
   invite: {
      margin: theme.spacing(2, 2, 2, 5),
      border: 0,
      borderRadius: 40,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      background: '#E67350',
      color: 'white',
      height: 48,
      padding: theme.spacing(0, 3),
      fontWeight: 'Bold',


      '&:hover': {
         backgroundColor: '#E6592E',
         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
   },

   //button styling used for leaving a group
   leave: {
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      height: 48,
      fontWeight: 'Bold',
      margin: theme.spacing(2, 0, 2, 5),
      padding: theme.spacing(0, 3),
      backgroundColor: "#fff",
      border: "2px solid",
      borderColor: "#E67350",
      borderRadius: 40,

      '&:hover': {
         backgroundColor: '#E6592E',
         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
   },

   //used to give spacing between members list and group avatar
   members: {
      marginTop: theme.spacing(30),
   },

   //heading
   h4: {
      marginBottom: theme.spacing(3),
   },

   //centers the schedule... kinda
   schedule: {
      paddingLeft: theme.spacing(3),


   }
}));

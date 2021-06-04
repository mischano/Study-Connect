import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

   //continue button styling
   continue: {
      border: 0,
      borderRadius: 40,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      background: '#E67350',
      color: 'white',
      height: 48,
      justifyContent: 'center',
      padding: '0 20px',
      fontWeight: 'Bold',

      '&:hover': { 
         backgroundColor: '#E6592E',
         color: 'white',
         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
   },

   // add class button
   addClass: {
      borderRadius: 40,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: '#E6592E',
      height: 48,
      padding: '0 20px',
      fontWeight: 'Bold',

      '&:hover': { 
            borderColor: '#E6592E',
            color: '#E6592E',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
   },

   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
   },

   //submit button styling
   submit: {
      border: 0,
      borderRadius: 40,
      boxShadow: '0 3px 5px 2px rgba(0,0,0, .3)',
      background: '#006494',
      color: 'white',
      height: 48,
      padding: '0 30px',

      '&:hover': { 
         background: '#00547A',
      },
   },

   //container for adding a class
   paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      borderRadius: 8,
   },

   //container for submitted classes
   root: {
      backgroundColor: "#fff",
      border: "2px solid",
      borderColor: "#006494",
      borderRadius: 20,
      marginTop: theme.spacing(3),
      width: "100%",
   },
   
   //name of class
   title: {
      color: '#041923',
      fontWeight: "Bold"
   },

   //description of class 
   text: {
      color: '#041923',
   },

   //paragraph on the left 
   introParagraph: { 
      width: '80%',
      padding: 10,
      paddingTop: 80, 
      color: 'white',
   }, 

   //heading on left side of screen
   h4: {
      marginBottom: theme.spacing(3),
   },

   image: { 
      position: 'fixed',
   },

   //wraps entire right side screen
   container: { 
      paddingLeft: 100,
      paddingRight: 100,
      marginTop: theme.spacing(8),
   },

   heading:{ 
      paddingBottom: '10px',
   },

}));
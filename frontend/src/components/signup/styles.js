import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
   submit: {
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
   confirm: {
      border: 0,
      borderRadius: 40,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      background: 'blue',
      color: 'white',
      height: 48,
      padding: '0 30px',
   },

   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      borderRadius: 8,
   },
   root: {
      backgroundColor: "#fff",
      border: "2px solid",
      borderColor: "#006494",
      borderRadius: 20,
      marginTop: theme.spacing(3),
      width: "100%",
   },
   
   title: {
      color: '#041923',
      fontWeight: "Bold"
   },

   text: {
      color: '#041923',
   },

   introParagraph: { 
      width: '80%',
      padding: 10,
      paddingTop: 80, 
      color: 'white',
   }, 

   h4: {
      marginBottom: theme.spacing(3),
   },

   image: { 
      position: 'fixed',
   },

   container: { 
      paddingLeft: 100,
      paddingRight: 100,
      marginTop: theme.spacing(8),
   },

   heading:{ 
      paddingBottom: '10px',
   },

}));
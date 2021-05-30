import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        padding: theme.spacing(2),
        fontFamily: 'Lato',
    },

    heading:{ 
        paddingBottom: '10px',
    },

    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        fontFamily: 'Lato',
    },

    field: {
        borderRadius: 25,
    },

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

    invite: {
        margin: theme.spacing(3, 0, 2),
        border: 0,
        borderRadius: 40,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        background: '#E67350',
        color: 'white',
        height: 48,
        width: '10%',
        fontWeight: 'Bold',

        '&:hover': { 
            backgroundColor: '#E6592E',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
    },



    h4: {
        marginBottom: theme.spacing(3),
    }
}));

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=> ({
    submit: {
        border: 0,
        borderRadius: 20,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        background: 'darkorange',
        color: 'white',
        height: 48,
        justifyContent: 'center'
    },
    addClass: {
        border: 0,
        borderRadius: 20,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        background: 'darkblue',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    confirm: {
        border: 0,
        borderRadius: 8,
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
    },
}));
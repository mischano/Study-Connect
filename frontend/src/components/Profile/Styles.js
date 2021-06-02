import { makeStyles } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import {
    withStyles, Button, TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        style: {
            maxWidth: '30px',
        },
    },
    input: {
        display: 'none',
    },
}));

const CustomEditButton = withStyles((theme) => ({
    root: {
        fontSize: 12,
        fontStyle: 'italic',
        font: 'Apple Color Emoji',
        color: theme.palette.getContrastText(teal[700]),
        backgroundColor: teal[700],
        '&:hover': {
            backgroundColor: teal[800],
        },
        size: {
            fontStyle: 'normal',
        },
    },
}))(Button);

const InputTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'tile',
            borderWidth: 1,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 1,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 4,
            borderColor: 'green',
            padding: '4px !important', // override inline-style
        },
    },
})(TextField)

export {
    useStyles,
    CustomEditButton,
    InputTextField
};
import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signin , signup } from '../../actions/auth';
import logo from '../Assets/BLACK.png';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    major: '',
    gradDate: ''
};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup) {
            (signup(formData, history));
            dispatch(signup(formData, history));
        }

        else {
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
       const result = res?.profileObj;
       const token = res?.tokenId;
       try {
           dispatch({type: 'AUTH', data: { result, token}});
           history.push('/dashboard');
       } catch (error) {
           console.log(error);
       }
    };

    const googleFailure = () =>
    {
        alert("Google sign in was unsuccessful");
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    return (
        
        <Container component="main" maxWidth="xs">
            <div style={{display: 'inline-block', width:'100%'}}><a href="/"><img id='logo' src={logo} alt='StudyConnect'></img></a></div>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography variant="h5"> {isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                <Input name="major" label="Major" handleChange={handleChange} half/>
                                <Input name="gradDate" label="Exp. Grad. Date" handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange}
                               type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}
                                            type="password"/>}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                        {isSignup ? 'Continue' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="849061658118-9mn44552cqfn7i42041nq16a05c2n54q.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailre={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In here' : "Don't have an account? Register here"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
export default Auth
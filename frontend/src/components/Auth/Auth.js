import React, {useState} from 'react';
import {Button, Paper, Grid, Typography, Container, Box} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';
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

      if (isSignup) {
         dispatch(signup(formData, history))
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
         dispatch({ type: 'AUTH', data: { result, token } });
         history.push('/dashboard');
      } catch (error) {
         console.log(error);
      }
   };

   const googleFailure = () => {
      alert("Google sign in was unsuccessful");
   };

   const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const styles = {
        container: {
            height: '100vh',
            width: '100%',
            background: "linear-gradient( rgba(0, 100, 148, 0.7), rgba(0, 100, 148, 0.7) ), url('https://images.unsplash.com/photo-1600195077077-7c815f540a3d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=936&q=80')",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },

        picture: { 
            height: '100%',
            width: '100%',
            padding: '25px'
        }
    };
    
    return (
        <Grid container>
            {/* Left side of screen with image and text */}
            <Grid item xs={12} sm={5}>
                <div style={styles.container}>
                    <div style={styles.picture}>
                        <div style={{display: 'inline-block', width:'auto'}}><a href="/"><img id='logo' src={logo} alt='StudyConnect'></img></a>
                        </div>

                        <div className= {classes.introParagraph}>
                            <div className= {classes.h4}>
                            <Typography variant="h4"><span style={{fontWeight: '900'}}>Finding success in numbers. </span></Typography>
                            </div>
                            <Typography>StudyConnect helps you collaborate with your classmates, give your group projects a home, and more. Get started for free today!</Typography>
                        </div>
                    </div>
                </div>
            </Grid>
            
            {/* Right side of screen with log-in stuff */}
            <Grid item xs={12} sm={7}>
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper} elevation={0}>
                        <Box pb={1.5}>
                            <div className= {classes.heading}>
                                <Typography variant="h5"> <span style={{fontWeight: '900'}}>{isSignup ? 'Register for StudyConnect' : 'Sign in to StudyConnect'}</span></Typography>
                            </div>
                            <Typography variant="p"> {isSignup ? 'We’re so glad to have you on board! First, give us some details about yourself.' : 'Welcome back! Sign in to access your groups and other academic resources.'}</Typography>
                        </Box>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {isSignup && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                        <Input name="major" label="Major" handleChange={handleChange} half/>
                                        <Input name="gradDate" label="Exp. Grad. Year" handleChange={handleChange} half/>
                                    </>
                                    )}
                                <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                                <Input name="password" label="Password" handleChange={handleChange}
                                    type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                                {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}
                                                    type="password"/>}
                            </Grid>
                            <Box pb={1.5} pt={1}>     
                            <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                                {isSignup ? 'Continue' : 'Sign In'}
                            </Button>
                            <GoogleLogin
                                clientId="849061658118-9mn44552cinf7i42041nq16a05c2n54q.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                        Google Sign In
                                    </Button>
                                )}
                                onSuccess={googleSuccess}
                                onFailre={googleFailure}
                                cookiePolicy="single_host_origin"
                            />
                            </Box>   
                            <Grid container justify="center">
                                <Grid item>
                                    <Button onClick={switchMode}>
                                        {isSignup ? 'Already have an account? Sign In here' : "Don't have an account? Register here"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
        </Grid>
        </Grid>
    );
}
export default Auth
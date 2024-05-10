import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const emailRef = useRef('');
  const confirmPasswordRef = useRef('');
  const [hasBeenTouched, setHasBeenTouched] = useState({username: false, email: false, confirmPassword: false});
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [signupIsDisabled, setSignupIsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const helperText = {
    username: ["Invalid username (must only use letters, numbers and _-, max 120 char)", ""],
    email: ["Invalid email", ""],
    confirmPassword: ["Doesn't match password", ""]
}

  useEffect(() => {
    if(!usernameError && !emailError && !confirmPasswordError && hasBeenTouched.username && hasBeenTouched.email && hasBeenTouched.confirmPassword){
      setSignupIsDisabled(false);
    }
    else{
      setSignupIsDisabled(true);
    }
  }, [usernameError, emailError, confirmPasswordError, hasBeenTouched]);

  function validateUsernameInputOnBlurHandler(){
    if(/^[a-zA-Z0-9_-]{1,120}$/.exec(usernameRef.current.value) !== null){
      setUsernameError(false);
    }
   else{
    setUsernameError(true);
   }
   setHasBeenTouched(hasBeenTouched => ({ ...hasBeenTouched, username: true}));
  }

  function validateEmailOnBlurHandler(){
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[a-zA-Z0-9-]+\.{1,1}[a-zA-Z0-9-]+$/.exec(emailRef.current.value) !== null){
      setEmailError(false);
    }
    else{
      setEmailError(true);
    }
    setHasBeenTouched(hasBeenTouched => ({ ...hasBeenTouched, email: true}));
  }

  function validateRetypePasswordOnBlurHandler(){
    if(passwordRef.current.value === confirmPasswordRef.current.value){
      setConfirmPasswordError(false);
    }
    else{
      setConfirmPasswordError(true);
    }
    setHasBeenTouched(hasBeenTouched => ({ ...hasBeenTouched, confirmPassword: true}));
  }



  function sendSignup() {
    fetch(process.env.REACT_APP_GITCHEN_API+"/api/signup", {
      method: 'POST',
      body: JSON.stringify({email: emailRef.current.value, username: usernameRef.current.value, password: passwordRef.current.value }),
      headers: { "Content-Type": "application/json" }
    })
    .then(response => {
      if(response.status === 201)
        setIsUserCreated(true);
      setTimeout(() => {navigate("/login")}, 5000);
    })
  }

  const userCreatedSuccessfully = <>
    <Typography>Your account has been created Successfully !</Typography>
    <Typography>You will be redirected to the login page in a moment</Typography>
  </>
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          >
            { isUserCreated ? userCreatedSuccessfully : <>
            <Typography component="h1" variant="h5">Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={sendSignup} sx={{ mt: 3}}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                required
                fullWidth
                onBlur={validateUsernameInputOnBlurHandler}
                error={usernameError}
                id="username"
                label="Username"
                name="username"
                helperText={usernameError ? helperText.username[0] : helperText.username[1]}
                inputRef={usernameRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  helperText={emailError ? helperText.email[0] : helperText.email[1]}
                  inputRef={emailRef}
                  autoComplete="email"
                  error={emailError}
                  onBlur={validateEmailOnBlurHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  inputRef={passwordRef}
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {setShowPassword(passwordShowed => !passwordShowed)}}
                        edge="end"
                        >
                          {showPassword ? <VisibilityOff/> : <Visibility/>}
                          </IconButton>
                      </InputAdornment>
                      )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="confirmPassword"
                  inputRef={confirmPasswordRef}
                  autoComplete="new-password"
                  error={confirmPasswordError}
                  helperText={confirmPasswordError ? helperText.confirmPassword[0] : helperText.confirmPassword[1]}
                  onChange={validateRetypePasswordOnBlurHandler}
                />
              </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                disabled={signupIsDisabled}
                onClick={sendSignup}
                sx={{ mt: 3, mb: 2}}>Sign Up</Button>
            </Box> </>}
          </Box> 
      </Container> 
    </>
  )
}

export default Signup;
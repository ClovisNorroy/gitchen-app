import { Button, Container, TextField, Grid, Typography, Box} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../store/login-context";

export default function Login() {
  const { loginSuccessfull } = useContext(LoginContext);
  const passwordRef = useRef('');
  const usernameRef = useRef('');
  const [showLogInError, setShowLoginError] = useState(false);
  const navigate = useNavigate();

  //TODO: Add timer
  function sendLogin() {
    fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/login_check", {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({ username: usernameRef.current.value, password: passwordRef.current.value }),
      headers: { "Content-Type": "application/json"}
    }).then(response => { console.log(response); return response; }).then(data => {
      if(data.status === 200){
        loginSuccessfull();
        navigate("/");
      }
      else{
        setShowLoginError(true);
      }
    });
  }

  return (
    <Container>
              <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          >
            <Typography component="h1" variant="h5">Connexion
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3}}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                  inputRef={usernameRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  inputRef={passwordRef}
                  autoComplete="new-password"
                />
              </Grid>
              </Grid>
              <Typography color="red" fontWeight="bolder" display={showLogInError ? "block" : "none"}>Mauvais nom d'utilisateur ou mot de passe</Typography>
              <Typography>Pas encore inscrit ? <NavLink to="/register">Enregistrez vous</NavLink></Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2}}
                onClick={sendLogin}>Connexion</Button>
            </Box>
          </Box>
    </Container>
  )
}
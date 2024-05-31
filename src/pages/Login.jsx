import { Button, Container, TextField, Grid, Typography, Box} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const passwordRef = useRef('');
  const usernameRef = useRef('');
  const [showLogInError, setShowLoginError] = useState(false);
  const navigate = useNavigate();

  //TODO: Remove and avoid Reload Use Context API
  useEffect(()=>{
    if(localStorage.getItem("lastConnectionTime") && new Date().getTime() < parseInt(localStorage.getItem("lastConnectionTime"))+import.meta.env.VITE_APP_CONNECTION_EXPIRATION_TIME){
      navigate("/");
    }
  }, [navigate]);

  //TODO: Add timer
  function sendLogin() {
    fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/login_check", {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({ username: usernameRef.current.value, password: passwordRef.current.value }),
      headers: { "Content-Type": "application/json"}
    }).then(response => { console.log(response); return response; }).then(data => {
      if(data.status === 204){
        localStorage.setItem("lastConnectionTime", new Date().getTime());
        window.location.reload();
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
                  label="Username"
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
                onClick={sendLogin}>Sign In</Button>
            </Box>
          </Box>
    </Container>
  )
}
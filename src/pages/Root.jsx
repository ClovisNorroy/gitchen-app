import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import CookieBanner from "../components/CookieBaner";
import { Box } from "@mui/material";
import LoginContextProvider from "../store/login-context";

function RootLayout() {
  return (
    <LoginContextProvider>
      <NavigationBar />
      <Box sx={{mt: 10, height: '90vh', display: 'flex'}}>
        <Outlet />
      </Box>
      <CookieBanner/>
    </LoginContextProvider>

  )
}

export default RootLayout;
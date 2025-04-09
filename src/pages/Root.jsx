import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import CookieBanner from "../components/CookieBaner";
import { Box, ThemeProvider, Typography } from "@mui/material";
import LoginContextProvider from "../store/login-context";
import theme from "../theme/theme";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <LoginContextProvider>
      <ThemeProvider theme={theme}>
        <NavigationBar />
        <Box sx={{ display: 'flex', minHeight: '90vh'}}>
          <Outlet />
        </Box>
        <CookieBanner/>
        <Footer/>
      </ThemeProvider>
    </LoginContextProvider>
  )
}

export default RootLayout;
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import CookieBanner from "../components/CookieBaner";
import { Box, ThemeProvider } from "@mui/material";
import LoginContextProvider from "../store/login-context";
import theme from "../theme/theme";

function RootLayout() {
  return (
    <LoginContextProvider>
      <ThemeProvider theme={theme}>
      <NavigationBar />
      <Box sx={{ height: '93vh', display: 'flex'}}>
        <Outlet />
      </Box>
      <CookieBanner/>
      </ThemeProvider>
    </LoginContextProvider>

  )
}

export default RootLayout;
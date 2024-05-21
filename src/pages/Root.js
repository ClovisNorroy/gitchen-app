import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import CookieBanner from "../components/CookieBaner";
import { Box } from "@mui/material";

function RootLayout() {
  return (
    <>
      <NavigationBar />
      <Box sx={{mt: 10, height: '90vh', display: 'flex'}}>
        <Outlet />
      </Box>
      <CookieBanner/>
    </>

  )
}

export default RootLayout;
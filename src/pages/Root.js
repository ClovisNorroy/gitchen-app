import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import CookieBanner from "../components/CookieBaner";

function RootLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <CookieBanner/>
    </>

  )
}

export default RootLayout;
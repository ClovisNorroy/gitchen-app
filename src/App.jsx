import './App.css';
import Menu from './pages/Menu';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import PageNotFound from './pages/PageNotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App({children}) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <PageNotFound />,
      children: [
        { path: '/', element: <Menu/>},
        { path: '/register', element: <Signup/>},
        { path: '/login', element: <Login/>}
      ]
    }
  ])
  return (
    <div>
        {children}
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;

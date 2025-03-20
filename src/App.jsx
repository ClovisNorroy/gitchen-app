import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import PageNotFound from './pages/PageNotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Planner, { loader as groceryLoader } from './pages/Planner';
import Home from './pages/Home';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';

function App({children}) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <PageNotFound />,
      children: [
        { path: '/', element: <Home/>},
        { path: '/planner', element: <Planner/>, loader: groceryLoader},
        { path: '/register', element: <Signup/>},
        { path: '/login', element: <Login/>},
        { path: '/recipes', element: <Recipes/>},
        { path: '/recipe', element: <Recipe/>},
        { path: '/recipe/:recipeID', element: <Recipe/>}
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

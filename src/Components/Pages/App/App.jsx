import { useRoutes, BrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import NotFound from '../NotFound/NotFound';
import UserProfile from '../UserProfile/UserProfile';
import { UserProvider } from '../../UserContext/UserContext';
import './App.css';

import Login from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';

const AppRoutes = () => {
  let routes = useRoutes([  
    { path: '/', element: <Home /> },
    { path: '/shopping-cart', element: <ShoppingCart /> },
    { path: '/user-profile', element: <UserProfile /> },
    { path: '/LogIn', element: <Login /> },
    { path: '/SignUp', element: <SignUp /> },
    { path: '*', element: <NotFound /> }
  ]);

  return routes;
};

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;

import { useRoutes, BrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import NotFound from "../NotFound/NotFound";
import UserProfile from "../UserProfile/UserProfile";
import { UserProvider } from "../../UserContext/UserContext";
import { CartProvider } from "../../Layouts/CartContext/CartContext";
import { BonoProvider } from "../../Layouts/BonoContext/BonoContext";
import { TreeInformation } from "../TreeInformation/TreeInformation" 
import { UserProviderBonos } from "../../Layouts/UserContextBonos/UserContextBonos";
import "./App.css";

import Login from "../LogIn/LogIn";
import SignUp from "../SignUp/SignUp";
import PostalCreator from "../Postal/Postal";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/shopping-cart", element: <ShoppingCart /> },
    { path: "/user-profile", element: <UserProfile /> },
    { path: "/LogIn", element: <Login /> },
    { path: "/SignUp", element: <SignUp /> },
    { path: "/tree-information/:treeId", element: <TreeInformation /> },
    { path: "*", element: <NotFound /> },
    {path: "/postal", element: <PostalCreator/>}
  ]);

  return routes;
};

const App = () => {
  return (
    <BrowserRouter>

      <BonoProvider>
        <CartProvider>
          <UserProvider>
            <AppRoutes />
          </UserProvider>
        </CartProvider>
      </BonoProvider>
    </BrowserRouter>
  );
};

export default App;

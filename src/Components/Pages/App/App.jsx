import { useRoutes, BrowserRouter } from 'react-router-dom'
import Home from '../Home/Home'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import NotFound from '../NotFound/NotFound'
import UserProfile from '../UserProfile/UserProfile'
import './App.css'
import SignIn from '../SignIn/SignIn'


const AppRoutes = () => {
let routes = useRoutes ([
    {path: '/', element: <Home/>},
    {path: '/shopping-cart', element: <ShoppingCart/>},
    {path: '/user-profile', element: <UserProfile/>},
    {path:'/signIn', element:<SignIn/>},
    {path: '*', element: <NotFound/>}

])

    return routes
}

const App = () => {
    return (
        <BrowserRouter>
        <AppRoutes/>
        </BrowserRouter>
    )
}
export default App

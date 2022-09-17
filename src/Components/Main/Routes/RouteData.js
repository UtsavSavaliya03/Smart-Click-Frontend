import AuthorizedRoute from '../../../Routers/AuthorizedRoute.jsx';
import PublicRoute from '../../../Routers/PublicRoute.jsx';
import Home from '../../../Pages/Home/index.jsx';
import Signup from '../../../Pages/Signup/index.jsx';
import Login from '../../../Pages/Login/index.jsx';
import Cart from '../../../Pages/Cart/index.jsx';
import ViewProduct from '../../../Pages/View Product/index.jsx';
import MyOrder from '../../../Pages/My Orders/index.jsx';

export const routeData = [
    {
        path: "/login",
        route: PublicRoute,
        element: Login,
    },
    {
        path: "/",
        route: AuthorizedRoute,
        element: Home,
    },
    {
        path: "/signup",
        route: PublicRoute,
        element: Signup,
    },
    {
        path: "/cart",
        route: AuthorizedRoute,
        element: Cart,
    },
    {
        path: "/myOrder",
        route: AuthorizedRoute,
        element: MyOrder,
    },
    {
        path: "/viewProduct",
        route: AuthorizedRoute,
        element: ViewProduct,
    },
]
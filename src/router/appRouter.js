import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import Personalized from '../pages/Personalized/Personalized';
import { NotRouteFound } from '../components';

// Define application routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/Personalized",
        element: <Personalized />,
      },
      {
        path: "*",
        element: <NotRouteFound />,
      },
    ],
  },
]);

export default appRouter;

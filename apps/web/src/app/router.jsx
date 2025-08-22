import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Trilhas from "./routes/Trilhas.jsx";
import Videos from "./pages/Videos.jsx";
import Video from "./pages/Video.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import GuestRoute from "./GuestRoute.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,        // Header + Outlet envolvendo tudo
    children: [
      { path: "/", element: <Home /> },

      { element: <GuestRoute />, children: [
        { path: "/login", element: <Login /> },
      ]},

      { element: <ProtectedRoute />, children: [
        { path: "/trilhas", element: <Trilhas /> },
        { path: "/videos", element: <Videos /> },
        { path: "/videos/:id", element: <Video /> },
      ]},
    ],
  },
]);

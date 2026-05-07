import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./routes/Login.jsx";
import Trilhas from "./routes/Trilhas.jsx";
import Videos from "./pages/Videos.jsx";
import Video from "./pages/Video.jsx";
import Blog from "./pages/Blog.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />, // Header + Outlet envolvendo tudo
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/trilhas", element: <Trilhas /> },
      { path: "/videos", element: <Videos /> },
      { path: "/videos/:id", element: <Video /> },
      { path: "/blog", element: <Blog /> },
    ],
  },
]);

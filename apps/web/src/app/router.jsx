import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Videos from "./pages/Videos.jsx";
import Video from "./pages/Video.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/videos", element: <Videos /> },
      { path: "/videos/:id", element: <Video /> },
    ],
  },
]);

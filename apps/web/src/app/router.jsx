import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Home from "./pages/Home.jsx";
import VideoPlayer from "../features/videos/VideoPlayer.jsx";
import NotFound from "./pages/NotFound.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/video/:videoId", element: <VideoPlayer /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

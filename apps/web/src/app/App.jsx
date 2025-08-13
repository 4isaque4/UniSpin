import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

/* pages */
import Home from "./pages/Home.jsx";
import Trilhas from "./pages/Trilhas.jsx";
import Videos from "./pages/Videos.jsx";
import Video from "./pages/Video.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trilhas" element={<Trilhas />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/:id" element={<Video />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

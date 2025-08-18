import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
        <Outlet />
      </main>
    </>
  );
}

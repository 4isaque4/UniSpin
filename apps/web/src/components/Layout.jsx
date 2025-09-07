import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <main
        style={{
          margin: 0,
          padding: 0,
          background: "linear-gradient(180deg, rgba(174, 223, 242, 0.35), rgba(68, 210, 242, 0.28))",
          minHeight: "calc(100vh - 80px)"
        }}
      >
        <Outlet />
      </main>
    </>
  );
}
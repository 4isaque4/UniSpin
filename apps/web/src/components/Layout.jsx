import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <main
        style={{
          maxWidth: 1200,
          margin: "24px auto",
          padding: "24px 16px",
          background: "linear-gradient(135deg, #dbeafe, #93c5fd)",
          borderRadius: "48px",
          border: "2px solid rgba(30,58,138,0.4)",
          boxShadow: "0 0 30px rgba(30,58,138,0.15)"
        }}
      >
        <Outlet />
      </main>
    </>
  );
}
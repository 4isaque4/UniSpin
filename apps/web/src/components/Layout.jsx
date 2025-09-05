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
          background: "linear-gradient(135deg, #ffffff, #dbeafe)",
          borderRadius: "32px",
          boxShadow: "0 0 20px rgba(30,58,138,0.1)"
        }}
      >
        <Outlet />
      </main>
    </>
  );
}
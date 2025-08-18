// apps/web/src/app/App.jsx
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import AuthProvider from "../features/auth/AuthProvider.jsx";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

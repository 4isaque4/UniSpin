// apps/web/src/app/App.jsx
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";

export default function App() {
  return <RouterProvider router={router} />;
}

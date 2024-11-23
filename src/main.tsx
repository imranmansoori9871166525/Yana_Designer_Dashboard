import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
// import { AuthProvider } from "./context/AuthContext.tsx";
// import { Dashboard, Login } from "./screen";
// import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <ProtectedRoute>
//         <Dashboard />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
// ]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
    {/* <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider> */}
  </StrictMode>
);

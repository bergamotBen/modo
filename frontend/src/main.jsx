import React from "react";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Done from "./pages/Done.jsx";
import Tasks from "./pages/Tasks.jsx";
// react-bootstrap docs: https://react-bootstrap.netlify.app/

/**
 * 🚨 CRITICAL: PWA Service Worker Registration
 * This wakes up your background /sw.js file so iOS Safari can handle
 * the incoming Web Push payloads even when the app is closed.
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "✅ Service Worker registered successfully with scope:",
          registration.scope,
        );
      })
      .catch((error) => {
        console.error("❌ Service Worker registration failed:", error);
      });
  });
}

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/done",
        element: <Done />,
      },
      {
        path: "/to-do",
        element: <Tasks />,
      },
    ],
  },
]);
// Render your main React application tree
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

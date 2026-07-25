import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Student logins end when the browser closes; teacher/admin logins persist.
// If the last signed-in profile was a student and this is a fresh browser
// session, drop the stored auth tokens before the provider picks them up.
// ponytail: sessionStorage marker — a student's brand-new second tab also
// counts as a fresh session and signs them out; fine for the single-tab LMS.
if (
  localStorage.getItem("studentSession") === "1" &&
  sessionStorage.getItem("sessionAlive") !== "1"
) {
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith("__convexAuth")) localStorage.removeItem(key);
  }
  localStorage.removeItem("studentSession");
}
sessionStorage.setItem("sessionAlive", "1");

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConvexAuthProvider>
  </StrictMode>,
);

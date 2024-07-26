import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

// grab puslisable key from env using vite with this
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// check if publsiable key is available if not throw error
if (!PUBLISHABLE_KEY) {
  throw new Error("Publishable Key is Missing");
}

// use the reactDOM document object model structe
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* wrap entire app in clerk point key to evn file */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
    </ClerkProvider>
  </React.StrictMode>,
)



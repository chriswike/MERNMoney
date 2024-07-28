import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <SignedIn>
            <Link to="/"> Dashboard</Link>
            <UserButton showName />
          </SignedIn>
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route
            path="/dashboard"
            element={
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
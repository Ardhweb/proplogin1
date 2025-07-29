import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Home from "./pages/Home";
import Firm from "./pages/FirmPage";
import OtherLayout from "./layouts/OtherLayout";
import PublicLayout from "./layouts/PublicLayout";
const Missing = () => <h2>404 - Page Not Found</h2>; // Quick placeholder

export function ProtectedRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isAuthenticated = auth?.user != null;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}


export const Routing = () => {
  return (
    <Routes>

      <Route element={<OtherLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Public Home with Layout (from App) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} /> 
      </Route>

       {/* Proteacted Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/myfirm" element={<Firm />} />
      </Route>

      

      <Route path="*" element={<Missing />} />

    </Routes>
  );
};

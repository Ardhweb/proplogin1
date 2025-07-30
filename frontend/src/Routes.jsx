import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Home from "./pages/Home";
import Firm from "./pages/FirmPage";
import Profile from "./pages/PofilePage";
import OtherLayout from "./layouts/OtherLayout";
import PublicLayout from "./layouts/PublicLayout";
const Missing = () => <h2>404 - Page Not Found</h2>; // Quick placeholder

export function isAuthenticated() {
  const authRaw = localStorage.getItem("auth");
  if (!authRaw) return false;

  try {
    const auth = JSON.parse(authRaw);
    return !!auth?.token && !!auth?.user;
  } catch {
    return false;
  }
}

export function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  // return <>{children}</>;
  return <Outlet />;
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
      {/* <Route element={<ProtectedRoute />}>
        <Route path="/myfirm" element={<Firm />} />
      </Route> */}

       <Route element={<ProtectedRoute />}>
        {/* Inside ProtectedRoute, add layout for protected pages */}
        <Route element={<PublicLayout />}>
          <Route path="/myfirm" element={<Firm />} />
           <Route path="/myprofile" element={<Profile />} />
          {/* Add more protected routes here */}
        </Route>
      </Route>

      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

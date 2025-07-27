import { Routes, Route } from 'react-router-dom';
import Signup from './pages/SignupPage';
import Home from './pages/Home';
import OtherLayout from './layouts/OtherLayout';
import PublicLayout from './layouts/PublicLayout';
const Missing = () => <h2>404 - Page Not Found</h2>; // Quick placeholder

export const Routing = () => {
  return (
    <Routes>
      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route element={<OtherLayout />}>
        <Route path="/signup" element={<Signup />} />
        {/* Add more protected/main routes here */}
      </Route>

       {/* Public Home with Layout (from App) */}
       <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

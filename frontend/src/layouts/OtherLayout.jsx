import { Outlet } from 'react-router-dom';

export default function OtherLayout({children}) {
  return (
    <div>
  
      {children}
      <Outlet />
    </div>
  );
}

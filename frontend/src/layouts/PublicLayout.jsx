import { Outlet } from 'react-router-dom';

export default function PublicLayout({children}) {
  return (
    <div>
  
      {children}
      <Outlet />
    </div>
  );
}

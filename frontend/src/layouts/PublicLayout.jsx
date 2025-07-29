import { Outlet } from 'react-router-dom';
import SimpleNavbar from '../components/SimpleNavbar';
export default function PublicLayout({children}) {
  return (
    <>
    
    <SimpleNavbar />
    
    <div>

      {children}
      <Outlet />
    </div></>
  );
}

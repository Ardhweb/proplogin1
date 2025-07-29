import { Outlet } from 'react-router-dom';

export default function OtherLayout({children}) {
  return (
    <div style={{backgroundImage: "url('/bg-img/roberto-motoi-3_5zd-OWe5Q-unsplash.jpg')", backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100vw',}}>
  
      {children}
      <Outlet />
    </div>
  );
}

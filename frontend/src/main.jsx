import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min"; 
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom';
import { Routing } from './Routes.jsx';

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <App />
   
    </BrowserRouter>
  
)

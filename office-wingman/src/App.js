import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import "./assets/styles/colors.css";

function App() {
  return (
    <div className="main">
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;

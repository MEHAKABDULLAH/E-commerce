import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';  // Assuming HomePage component is created
import LoginPage from '../pages/LoginPage';  // Assuming LoginPage component is created
import Cart from '../components/Cart';  // Assuming Cart component is created
import RegisterPage from '../pages/RegisterPage';  // Assuming RegisterPage component is created
import AdminPage from '../pages/AdminPage';  // Assuming AdminPage component is created
import Navbar from '../components/Navbar'; 
import Main from '../pages/MainPage/Main' // Assuming Navbar component is created

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />  {/* Navbar will be displayed on all pages */}
      <Routes>
        <Route path="/E-commerce" element={<Main />} />
        <Route path="/products" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} /> {/* Login Page Route */}
        <Route path="/cart" element={<Cart />} /> {/* Cart Page Route */}
        <Route path="/register" element={<RegisterPage />} /> {/* Register Page Route */}
        <Route path="/admin" element={<AdminPage />} /> {/* Admin Page Route */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;

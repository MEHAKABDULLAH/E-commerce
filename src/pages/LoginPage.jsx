import { useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import Logo from '../assets/logoo.png';
import '../pages/login.css';
import { toast } from 'react-toastify';
import { message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    try {
      const { data } = await axios.post('https://backend-delta-nine-60.vercel.app/api/auth/users/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userId', data.user._id);
      message.success('Login successful! Welcome back.');

      navigate('/E-commerce');
    } catch (err) {
      // Log the error response for debugging
      console.error(err.response?.data || err.message);
      // Set a more specific error message based on the server response
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4"><em>Login Here</em></h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          /><br /><br />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          /> <br /><br />
          <button
            type="submit"
            className="w-full text-white py-2 transition rounded-md loginbutton"
          >
            Login
          </button> <br />  <br />
          <p className='text-center text-sm'>If you have no account? <Link to={'/register'} className="text-blue-600 hover:underline">Create One</Link></p>
        </form>
        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
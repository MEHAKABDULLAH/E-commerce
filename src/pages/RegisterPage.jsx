import { useState } from 'react';
import Logo from '../assets/logoo.png';
import axios from 'axios';
import '../pages/register.css';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError('');

    try {
      const { data } = await axios.post('https://backend-delta-nine-60.vercel.app/api/auth/users/register', {
        email,
        password,
        name,
      });
      localStorage.setItem('token', data.token)
      message.success('Registered sucessfully!')
      navigate('/login');
    } catch (err) {
      // Log the error response for debugging
      console.error(err.response.data);
      // Set a more specific error message based on the server response
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">  
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="Logo" className="h-16" />
          </div> 
          <em>Create an Account</em>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> <br /><br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> <br /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />  <br /><br />
          <button
            type="submit"
            className="w-full signupbtn text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
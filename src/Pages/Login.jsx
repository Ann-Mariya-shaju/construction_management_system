import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1) Admin login check
    if (credentials.email === "admin@gmail.com" && credentials.password === "admin123") {
      navigate('/admin-dashboard');
      return;
    }

    // 2) Contractor / User
    if (state?.role === 'contractor') {
      navigate('/contractor-form');
    } else if (state?.role === 'user') {
      navigate('/user-dashboard');
    } else {
      // fallback if somehow no role
      navigate('/role-selection');
    }
  };

  return (
    
<div className="auth-bg d-flex justify-content-center align-items-center" style={{ minHeight: '70vh', backgroundImage: 'url(/src/assets/home.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white p-5 rounded shadow" style={{ width: '100%', maxWidth: '400px' }}>
      <h2 className="text-center mb-4 text-dark">Login</h2>
      <form onSubmit={handleSubmit}>
          <div className="mb-3 text-dark">
            <label>Email</label>
            <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={handleChange} required />
          </div>
          <div className="mb-3 text-dark">
            <label>Password</label>
            <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
         
        </form>
        <p className="text-center mt-4 text-sm text-dark">Don't have an account? <span className="text-blue-600 cursor-pointer hover:underline text-warning" onClick={() => navigate('/register')}>Register</span></p>
      </div>
    </div>
  );
}

export default Login;

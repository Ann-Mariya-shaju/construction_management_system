import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/role-selection');
  };

  return (
    <div
    className="auth-bg d-flex justify-content-center align-items-center"
    style={{
      minHeight: '70vh',
      backgroundImage: 'url(/src/assets/home.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div
      className="bg-white p-5 rounded shadow"
      style={{ width: '100%', maxWidth: '400px' }}
    >
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-dark">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-dark">
            <label>Name</label>
            <input type="text" className="form-control" placeholder="Enter name" required />
          </div>
          <div className="mb-3 text-dark">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Enter email" required />
          </div>
          <div className="mb-3 text-dark">
            <label>Phone</label>
            <input type="text" className="form-control" placeholder="Enter phone number" required />
          </div>
          <div className="mb-3 text-dark">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" required />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
          <p className="text-center mt-4 text-sm text-dark">Already have an account? <span className="text-blue-600 cursor-pointer hover:underline text-warning" onClick={() => navigate('/login')}>login</span></p>
      </form>
      
      </div>
      </div>
      </div>
  );
}

export default Register;
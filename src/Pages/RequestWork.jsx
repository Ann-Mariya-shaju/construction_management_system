import React, { useState } from 'react';

function RequestWork() {
  const [formData, setFormData] = useState({
    squareFeet: '',
    amount: '',
    time: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Work Requested Successfully!');
    // Normally you would send this data to backend.
  };

  return (
    <div className="container mt-4">
      <h2>Request a New Work</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow" style={{ maxWidth: '500px', margin: 'auto' }}>
        <input 
          type="number" 
          name="squareFeet" 
          placeholder="Square Feet" 
          onChange={handleChange}
          required 
          className="form-control mb-2"
        />
        <input 
          type="number" 
          name="amount" 
          placeholder="Amount you can provide (₹)" 
          onChange={handleChange}
          required 
          className="form-control mb-2"
        />
        <input 
          type="text" 
          name="time" 
          placeholder="Time to complete work" 
          onChange={handleChange}
          required 
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-success w-100">Request Work</button>
      </form>
    </div>
  );
}

export default RequestWork;

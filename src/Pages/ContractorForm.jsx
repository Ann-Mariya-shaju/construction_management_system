import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ContractorForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    previousWorks: '',
    cost: '',
    time: '',
    workImages: []
  });

  // Fix: Define handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      workImages: files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/contractor-details', { state: formData });
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: '80vh',
        backgroundImage: 'url(/src/assets/home.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h4 className="text-center mb-4 text-dark">Contractor Details</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="form-control mb-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="form-control mb-2"
          />

          <textarea
            name="previousWorks"
            placeholder="Describe Previous Works"
            onChange={handleChange}
            required
            className="form-control mb-2"
          />

          <label className="form-label text-dark">Upload Previous Work Images</label>
          <input
            type="file"
            name="workImages"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="form-control mb-2"
          />

          <input
            type="text"
            name="cost"
            placeholder="Amount per square foot (₹)"
            onChange={handleChange}
            required
            className="form-control mb-2"
          />

          <input
            type="text"
            name="time"
            placeholder="Estimated time to complete the work"
            onChange={handleChange}
            required
            className="form-control mb-3"
          />

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContractorForm;

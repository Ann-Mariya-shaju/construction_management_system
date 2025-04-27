import React from 'react';
import { useLocation } from 'react-router-dom';

function ContractorDetails() {
  const location = useLocation();
  const contractor = location.state || {};

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh', backgroundImage: 'url(/src/assets/home.jpg)', backgroundSize: 'cover' }}>
      <div className="bg-white p-4 rounded shadow" style={{ width: '100%', maxWidth: '400px' }}>
    <div className="container mt-5">
      <h2 className=" text-center text-dark mb-4">ADD WORK DETAILS</h2>

      <div className="card p-3">
        <p><strong>Name:</strong> {contractor.name}</p>
        <p><strong>Email:</strong> {contractor.email}</p>
        <p><strong>Previous Works:</strong> {contractor.previousWorks}</p>
        <p><strong>Cost per Sq Ft:</strong> {contractor.cost}</p>
        <p><strong>Estimated Time:</strong> {contractor.time}</p>

        <div className="mt-3">
          <strong>Uploaded Work Images:</strong>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {contractor.workImages &&
              contractor.workImages.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Work ${index + 1}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default ContractorDetails;

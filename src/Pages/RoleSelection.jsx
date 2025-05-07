import React from 'react';
import { useNavigate } from 'react-router-dom';

function RoleSelection() {
  const navigate = useNavigate();

  return (
  <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh', backgroundImage: 'url(/src/assets/home.jpg)', backgroundSize: 'cover' }}>
    <div className="bg-white p-4 rounded shadow" style={{ width: '100%', maxWidth: '400px'}}>
      <h4 className="text-center mb-4">Select Your Role</h4>
      <button className="btn btn-primary w-100 mb-3" onClick={() => navigate("/login", { state: { role: 'user' } })}>Login as User</button>
      <button className="btn btn-secondary w-100" onClick={() => navigate("/login", { state: { role: 'contractor' } })}>Login as Contractorr</button>
    </div>
    </div>
  );
}

export default RoleSelection;
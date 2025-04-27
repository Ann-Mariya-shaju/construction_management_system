import React from 'react';
import { Link } from 'react-router-dom';

function UserDashboard() {
  return (
    <div className="container mt-4">
      <h2>Welcome, User!</h2>
      <div className="d-flex gap-3 mt-3">
        <Link to="/completed-works" className="btn btn-success">View Completed Works</Link>
        <Link to="/request-work" className="btn btn-info">Request New Work</Link>
      </div>
    </div>
  );
}

export default UserDashboard;

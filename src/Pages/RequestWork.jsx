import React, { useState, useEffect } from 'react';

export default function RequestWork() {
  const [requestedWorks, setRequestedWorks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('requestedWorks')) || [];
    setRequestedWorks(saved);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Requested Contractor Works</h1>

      {requestedWorks.length === 0 ? (
        <p>No contractor works requested yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requestedWorks.map(req => (
            <div key={req.requestId} className="border p-4 rounded-md bg-white shadow">
              <h2 className="text-xl font-bold">{req.name}</h2>
              <p>Cost: ₹{req.cost} per sqft</p>
              <p>Time: {req.time} days</p>
              <p className="mt-2">
                Request Status:{' '}
                <span className="font-bold text-yellow-600">{req.userRequestStatus}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';

function UserDashboard() {
  const [contractorWorks, setContractorWorks] = useState([]);

  useEffect(() => {
    const storedWorks = JSON.parse(localStorage.getItem('contractorWorks')) || [];
    setContractorWorks(storedWorks);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Contractor Works</h2>
      {contractorWorks.length === 0 ? (
        <p className="text-center text-gray-500">No contractor works available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contractorWorks.map((work, index) => (
            <div key={index} className="bg-white p-6 rounded shadow">
              {work.imageUrl && <img src={work.imageUrl} alt="Work" className="w-full h-48 object-cover rounded mb-4" />}
              <h3 className="text-xl font-semibold mb-2">{work.workType}</h3>
              <p><strong>Cost per Sqft:</strong> ₹{work.costPerSqft}</p>
              <p><strong>Estimated Time:</strong> {work.estimatedTime}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;

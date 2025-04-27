import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [contractorWorks, setContractorWorks] = useState([]);

  useEffect(() => {
    const storedWorks = JSON.parse(localStorage.getItem('contractorWorks')) || [];
    setContractorWorks(storedWorks);
  }, []);

  const updateStatus = (index, status) => {
    const updatedWorks = [...contractorWorks];
    updatedWorks[index].status = status;

    setContractorWorks(updatedWorks);
    localStorage.setItem('contractorWorks', JSON.stringify(updatedWorks));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>
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
              <p><strong>Status:</strong> {work.status || 'Pending'}</p>

              <div className="flex gap-2 mt-4">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => updateStatus(index, 'Approved')}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => updateStatus(index, 'Rejected')}
                >
                  Reject
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  onClick={() => updateStatus(index, 'Pending')}
                >
                  Pending
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

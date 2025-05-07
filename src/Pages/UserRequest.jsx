import React, { useEffect, useState } from 'react';

export default function UserRequests() {
  const [requestedWorks, setRequestedWorks] = useState([]);
  const [ownWorks, setOwnWorks] = useState([]);

  useEffect(() => {
    const reqWorks = JSON.parse(localStorage.getItem('requestedWorks')) || [];
    setRequestedWorks(reqWorks);

    const ownUserWorks = JSON.parse(localStorage.getItem('userOwnWorks')) || [];
    setOwnWorks(ownUserWorks);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Requested Works</h1>

      <h2 className="text-2xl mb-4">Works Requested From Contractors</h2>
      {requestedWorks.length === 0 ? (
        <p>No requested works yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {requestedWorks.map((work) => (
            <li key={work.id} className="mb-2">
              Work ID: {work.workId} - Status: {work.status}
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-2xl mb-6 mt-10">Own Work Requests Sent to Admin</h2>
      {ownWorks.length === 0 ? (
        <p>No own work requests yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {ownWorks.map((work) => (
            <li key={work.id} className="mb-2">
              {work.name} - Status: {work.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

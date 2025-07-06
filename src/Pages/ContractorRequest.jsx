import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes, FaEnvelopeOpen } from 'react-icons/fa';
import RequestStatus from '../../components/RequestStatus';

const ContractorRequests = ({ contractorId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = () => {
      const storedRequests = localStorage.getItem(`contractorRequests_${contractorId}`) || '[]';
      setRequests(JSON.parse(storedRequests));
      setLoading(false);
    };
    loadRequests();
  }, [contractorId]);

  const handleStatusChange = (requestId, newStatus) => {
    const updatedRequests = requests.map(request => 
      request.id === requestId ? { ...request, status: newStatus } : request
    );
    setRequests(updatedRequests);
    localStorage.setItem(`contractorRequests_${contractorId}`, JSON.stringify(updatedRequests));
    
    // Also update in main requests
    const allRequests = JSON.parse(localStorage.getItem('userWorkRequests') || '[]');
    const updatedAllRequests = allRequests.map(request =>
      request.id === requestId ? { ...request, status: newStatus } : request
    );
    localStorage.setItem('userWorkRequests', JSON.stringify(updatedAllRequests));
  };

  if (loading) return <div>Loading requests...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Work Requests</h2>
      
      {requests.length === 0 ? (
        <div className="text-center py-10">
          <FaEnvelopeOpen className="mx-auto text-4xl text-gray-500 mb-4" />
          <p className="text-gray-400">No work requests have been forwarded to you yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(request => (
            <div key={request.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    {request.projectTitle || `Request #${request.id.slice(0, 6)}`}
                  </h3>
                  <p className="text-gray-400">{request.description}</p>
                </div>
                <RequestStatus status={request.status} />
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400">Budget</p>
                  <p>₹{request.budget || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-gray-400">Timeframe</p>
                  <p>{request.completionPeriod || 'Not specified'} days</p>
                </div>
                <div>
                  <p className="text-gray-400">Received</p>
                  <p>{new Date(request.requestDate).toLocaleDateString()}</p>
                </div>
              </div>

              {request.status === 'pending' && (
                <div className="mt-4 flex justify-end space-x-2">
                  <button 
                    onClick={() => handleStatusChange(request.id, 'accepted')}
                    className="px-4 py-2 bg-green-600 rounded-lg flex items-center"
                  >
                    <FaCheck className="mr-2" /> Accept
                  </button>
                  <button 
                    onClick={() => handleStatusChange(request.id, 'rejected')}
                    className="px-4 py-2 bg-red-600 rounded-lg flex items-center"
                  >
                    <FaTimes className="mr-2" /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContractorRequests;
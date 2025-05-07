import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHome, FaUserTie, FaClipboardList, FaSignOutAlt, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [contractors, setContractors] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contractors');

  useEffect(() => {
    // Load contractors data from localStorage
    const loadContractors = () => {
      try {
        const storedData = localStorage.getItem('contractorWorks');
        const parsedData = storedData ? JSON.parse(storedData) : [];
        console.log("Loaded contractors:", parsedData);
        setContractors(parsedData);
      } catch (error) {
        console.error("Error loading contractor data:", error);
        toast.error("Error loading contractor data");
      }
    };

    // Load user requests data from localStorage
    const loadUserRequests = () => {
      try {
        const storedRequests = localStorage.getItem('requestedWorks');
        const parsedRequests = storedRequests ? JSON.parse(storedRequests) : [];
        console.log("Loaded user requests:", parsedRequests);
        setUserRequests(parsedRequests);
      } catch (error) {
        console.error("Error loading user request data:", error);
        toast.error("Error loading user request data");
      } finally {
        setLoading(false);
      }
    };

    loadContractors();
    loadUserRequests();
  }, []);

  // Function to update contractor status
  const updateContractorStatus = (id, newStatus) => {
    try {
      const updated = contractors.map(c => {
        if (c.id === id) {
          return { ...c, status: newStatus };
        }
        return c;
      });

      setContractors(updated);
      localStorage.setItem('contractorWorks', JSON.stringify(updated));

      if (newStatus === 'approved') {
        toast.success('Contractor Approved Successfully!');
      } else if (newStatus === 'rejected') {
        toast.error('Contractor Rejected Successfully!');
      }
    } catch (error) {
      console.error("Error updating contractor status:", error);
      toast.error("Failed to update status");
    }
  };

  // Function to update user request status
  const updateRequestStatus = (id, newStatus) => {
    try {
      const updated = userRequests.map(req => {
        if (req.id === id) {
          return { ...req, status: newStatus };
        }
        return req;
      });

      setUserRequests(updated);
      localStorage.setItem('requestedWorks', JSON.stringify(updated));

      if (newStatus === 'approved') {
        toast.success('User Request Approved Successfully!');
      } else if (newStatus === 'rejected') {
        toast.error('User Request Rejected Successfully!');
      }
    } catch (error) {
      console.error("Error updating request status:", error);
      toast.error("Failed to update request status");
    }
  };

  // Function to delete contractor
  const deleteContractor = (id) => {
    try {
      const updated = contractors.filter(c => c.id !== id);
      setContractors(updated);
      localStorage.setItem('contractorWorks', JSON.stringify(updated));
      toast.info('Contractor Deleted Successfully!');
    } catch (error) {
      console.error("Error deleting contractor:", error);
      toast.error("Failed to delete contractor");
    }
  };

  // Function to delete user request
  const deleteRequest = (id) => {
    try {
      const updated = userRequests.filter(req => req.id !== id);
      setUserRequests(updated);
      localStorage.setItem('requestedWorks', JSON.stringify(updated));
      toast.info('User Request Deleted Successfully!');
    } catch (error) {
      console.error("Error deleting user request:", error);
      toast.error("Failed to delete user request");
    }
  };

  const getStatusColor = (status) => {
    if (status === 'approved') return 'green';
    if (status === 'rejected') return 'red';
    return 'orange';
  };

  const handleLogout = () => {
    navigate('/');
    toast.info('Logged out successfully');
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        color: 'white',
        paddingTop: '20px',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
        zIndex: 10
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h3 style={{ color: '#ffc107', margin: '0' }}>SJS Builders</h3>
          <p style={{ color: '#999', fontSize: '0.8rem', marginTop: '5px' }}>Admin Panel</p>
        </div>

        <div style={{ padding: '0 15px' }}>
          <NavItem 
            icon={<FaHome />} 
            text="Dashboard" 
            active={true} 
            onClick={() => {}}
          />
          
          <NavItem 
            icon={<FaUserTie />} 
            text="Contractors" 
            active={activeTab === 'contractors'} 
            onClick={() => setActiveTab('contractors')}
          />
          
          <NavItem 
            icon={<FaClipboardList />} 
            text="User Requests" 
            active={activeTab === 'userRequests'} 
            onClick={() => setActiveTab('userRequests')}
          />
          
          <div style={{ borderTop: '1px solid #555', margin: '20px 0' }}></div>
          
          <NavItem 
            icon={<FaSignOutAlt />} 
            text="Logout" 
            onClick={handleLogout}
          />
        </div>
      </div>

      {/* Main Content Area with fixed background and scrolling */}
      <div style={{ 
        marginLeft: '250px', 
        flexGrow: 1,
        backgroundImage: `url('./assets/home.png')`, // Replace with correct image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // This ensures the background stays fixed when scrolling
        minHeight: '100vh',
        padding: '20px',
        overflowY: 'auto' // Enable scrolling in the content area
      }}>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
        
        {/* Content Header */}
        <div style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
          borderRadius: '10px',
          padding: '20px', 
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ color: 'white', margin: '0' }}>
            {activeTab === 'contractors' ? 'Contractor Management' : 'User Request Management'}
          </h2>
          <span style={{ color: '#ffc107', fontSize: '0.9rem' }}>
            {new Date().toLocaleString()}
          </span>
        </div>
        
        {/* Conditional Content Based on Active Tab */}
        {activeTab === 'contractors' ? (
          <div>
            {contractors.length === 0 ? (
              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                <p style={{ color: 'white' }}>No contractor submissions yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {contractors.map((c, idx) => (
                  <div key={idx} style={{
                    border: '1px solid #333',
                    borderRadius: '10px',
                    padding: '20px',
                    width: '300px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.6)',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(5px)', // Add blur effect for all cards
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <h3 style={{ marginBottom: '10px' }}>{c.name}</h3>
                      <p><strong>Email:</strong> {c.email}</p>
                      <p><strong>Previous Works:</strong> {c.previousWorks}</p>
                      <p><strong>Cost/sqft:</strong> ₹{c.cost}</p>
                      <p><strong>Completion Time:</strong> {c.time} days</p>
                      <p><strong>Status:</strong> 
                        <span style={{
                          marginLeft: '10px',
                          padding: '5px 10px',
                          borderRadius: '20px',
                          backgroundColor: getStatusColor(c.status),
                          color: 'white',
                          fontSize: '12px'
                        }}>
                          {c.status ? c.status.toUpperCase() : 'PENDING'}
                        </span>
                      </p>
                    </div>

                    <div>
                      {c.imageUrls && Array.isArray(c.imageUrls) && c.imageUrls.map((img, index) => (
                        <img 
                          key={index} 
                          src={img} 
                          alt="Work" 
                          style={{ 
                            width: '100%', 
                            marginBottom: '5px', 
                            borderRadius: '5px', 
                            maxHeight: '100px', 
                            objectFit: 'cover' 
                          }} 
                        />
                      ))}

                      {/* Always show approve/reject buttons regardless of status */}
                      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <button 
                          style={{ 
                            backgroundColor: 'green', 
                            color: 'white', 
                            border: 'none', 
                            padding: '5px 10px', 
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px' 
                          }}
                          onClick={() => updateContractorStatus(c.id, 'approved')}>
                          <FaCheck /> Approve
                        </button>
                        <button 
                          style={{ 
                            backgroundColor: 'red', 
                            color: 'white', 
                            border: 'none', 
                            padding: '5px 10px', 
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                          onClick={() => updateContractorStatus(c.id, 'rejected')}>
                          <FaTimes /> Reject
                        </button>
                      </div>

                      <button 
                        style={{ 
                          backgroundColor: '#555', 
                          color: 'white', 
                          border: 'none', 
                          padding: '5px 10px', 
                          borderRadius: '5px', 
                          marginTop: '10px', 
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px'
                        }}
                        onClick={() => deleteContractor(c.id)}>
                        <FaTrash /> Delete Contractor
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {userRequests.length === 0 ? (
              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                <p style={{ color: 'white' }}>No user requests yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {userRequests.map((request, idx) => (
                  <div key={idx} style={{
                    border: '1px solid #333',
                    borderRadius: '10px',
                    padding: '20px',
                    width: '350px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.6)',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Make slightly more transparent
                    backdropFilter: 'blur(5px)', // Add blur effect
                    color: 'white',
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginBottom: '15px',
                      borderBottom: '1px solid #555',
                      paddingBottom: '10px'
                    }}>
                      <h3 style={{ margin: '0' }}>
                        {request.type === 'custom' ? request.projectTitle : `Contractor Request`}
                      </h3>
                      <span style={{
                        padding: '5px 10px',
                        borderRadius: '20px',
                        backgroundColor: getStatusColor(request.status),
                        color: 'white',
                        fontSize: '12px'
                      }}>
                        {request.status ? request.status.toUpperCase() : 'PENDING'}
                      </span>
                    </div>

                    {request.type === 'custom' ? (
                      <div>
                        <p><strong>Project:</strong> {request.projectTitle}</p>
                        <p><strong>Square Feet:</strong> {request.squareFeet} sq.ft</p>
                        <p><strong>Budget:</strong> ₹{request.budget}</p>
                        <p><strong>Completion Period:</strong> {request.completionPeriod} days</p>
                        <p><strong>Description:</strong> {request.description}</p>
                      </div>
                    ) : (
                      <div>
                        <p><strong>Contractor Name:</strong> {request.name}</p>
                        <p><strong>Cost/sqft:</strong> ₹{request.cost}</p>
                        <p><strong>Completion Time:</strong> {request.time} days</p>
                      </div>
                    )}
                    
                    <p><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>

                    {/* Always show approve/reject buttons regardless of status */}
                    <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                      <button 
                        style={{ 
                          backgroundColor: 'green', 
                          color: 'white', 
                          border: 'none', 
                          padding: '8px 15px', 
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                        onClick={() => updateRequestStatus(request.id, 'approved')}>
                        <FaCheck /> Approve
                      </button>
                      <button 
                        style={{ 
                          backgroundColor: 'red', 
                          color: 'white', 
                          border: 'none', 
                          padding: '8px 15px', 
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                        onClick={() => updateRequestStatus(request.id, 'rejected')}>
                        <FaTimes /> Reject
                      </button>
                    </div>

                    <button 
                      style={{ 
                        backgroundColor: '#555', 
                        color: 'white', 
                        border: 'none', 
                        padding: '8px 15px', 
                        borderRadius: '5px', 
                        marginTop: '10px', 
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                      }}
                      onClick={() => deleteRequest(request.id)}>
                      <FaTrash /> Delete Request
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Navigation Item Component
const NavItem = ({ icon, text, active = false, onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 15px',
        cursor: 'pointer',
        backgroundColor: active ? 'rgba(255, 193, 7, 0.2)' : 'transparent',
        color: active ? '#ffc107' : 'white',
        borderRadius: '5px',
        marginBottom: '5px',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <span style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
};
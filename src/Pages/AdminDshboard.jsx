import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHome, FaUserTie, FaClipboardList, FaSignOutAlt, FaCheck, FaTimes, FaTrash, FaEnvelope, FaPhone, FaCalendarAlt, FaMoneyBillWave, FaRulerCombined } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [contractors, setContractors] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contractors');

  // Enhanced color scheme
  const colors = {
    primary: '#2C3E50',         // Dark blue
    secondary: '#3498DB',       // Bright blue
    accent: '#E74C3C',         // Red
    success: '#27AE60',        // Green
    warning: '#F39C12',        // Orange
    info: '#2980B9',           // Blue
    light: '#ECF0F1',          // Light gray
    dark: '#2C3E50',           // Dark blue
    background: '#F5F7FA',     // Very light gray
    text: '#34495E',           // Dark gray-blue
    white: '#FFFFFF',
    paleGreen: '#E8F8F5',      // Very pale green
    paleBlue: '#EBF5FB'        // Very pale blue
  };

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
    if (status === 'approved') return colors.success;
    if (status === 'rejected') return colors.accent;
    return colors.warning;
  };

  const getStatusIcon = (status) => {
    if (status === 'approved') return <FaCheck style={{ marginRight: 5 }} />;
    if (status === 'rejected') return <FaTimes style={{ marginRight: 5 }} />;
    return null;
  };

  const handleLogout = () => {
    navigate('/');
    toast.info('Logged out successfully');
  };

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '20px', 
        backgroundColor: colors.background, 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '18px',
        color: colors.text
      }}>
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: colors.background }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        backgroundColor: colors.primary,
        color: colors.white,
        paddingTop: '30px',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        boxShadow: '2px 0 15px rgba(0, 0, 0, 0.1)',
        zIndex: 10
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 20px' }}>
          <h2 style={{ 
            color: colors.white, 
            margin: '0',
            fontSize: '1.5rem',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>SJS Builders</h2>
          <p style={{ 
            color: colors.light, 
            fontSize: '0.85rem', 
            marginTop: '8px',
            opacity: 0.8
          }}>Admin Dashboard</p>
        </div>

        <div style={{ padding: '0 20px' }}>
          <NavItem 
            icon={<FaHome style={{ fontSize: '1.1rem' }} />} 
            text="Dashboard" 
            active={true} 
            onClick={() => {}}
            colors={colors}
          />
          
          <NavItem 
            icon={<FaUserTie style={{ fontSize: '1.1rem' }} />} 
            text="Contractors" 
            active={activeTab === 'contractors'} 
            onClick={() => setActiveTab('contractors')}
            colors={colors}
          />
          
          <NavItem 
            icon={<FaClipboardList style={{ fontSize: '1.1rem' }} />} 
            text="User Requests" 
            active={activeTab === 'userRequests'} 
            onClick={() => setActiveTab('userRequests')}
            colors={colors}
          />
          
          <div style={{ 
            borderTop: `1px solid rgba(255,255,255,0.1)`, 
            margin: '25px 0',
            opacity: 0.5
          }}></div>
          
          <NavItem 
            icon={<FaSignOutAlt style={{ fontSize: '1.1rem' }} />} 
            text="Logout" 
            onClick={handleLogout}
            colors={colors}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ 
        marginLeft: '280px', 
        flexGrow: 1,
        backgroundColor: colors.background,
        minHeight: '100vh',
        padding: '30px',
        overflowY: 'auto',
      }}>
        <ToastContainer 
          position="top-right" 
          autoClose={2000} 
          hideProgressBar 
          toastStyle={{ 
            backgroundColor: colors.white,
            color: colors.text,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        />
        
        {/* Content Header */}
        <div style={{ 
          backgroundColor: colors.white,
          borderRadius: '10px',
          padding: '25px', 
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          borderLeft: `5px solid ${colors.secondary}`
        }}>
          <div>
            <h2 style={{ 
              color: colors.primary, 
              margin: '0',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              {activeTab === 'contractors' ? 'Contractor Management' : 'User Request Management'}
            </h2>
            <p style={{ 
              color: colors.text, 
              fontSize: '0.9rem', 
              marginTop: '5px',
              opacity: 0.8
            }}>
              {activeTab === 'contractors' 
                ? 'Review and manage contractor submissions' 
                : 'Manage user construction requests'}
            </p>
          </div>
          <div style={{ 
            backgroundColor: colors.paleBlue, 
            padding: '10px 15px',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FaCalendarAlt style={{ color: colors.info }} />
            <span style={{ 
              color: colors.text,
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
        
        {/* Conditional Content Based on Active Tab */}
        {activeTab === 'contractors' ? (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ 
                color: colors.text,
                margin: 0,
                fontWeight: '500'
              }}>
                Contractor Submissions ({contractors.length})
              </h3>
            </div>

            {contractors.length === 0 ? (
              <div style={{ 
                backgroundColor: colors.white, 
                borderRadius: '10px', 
                padding: '40px 20px', 
                textAlign: 'center',
                boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
                marginBottom: '30px'
              }}>
                <p style={{ 
                  color: colors.text,
                  fontSize: '1rem',
                  opacity: 0.7
                }}>
                  No contractor submissions yet. Check back later.
                </p>
              </div>
            ) : (
              <div style={{
                backgroundColor: colors.white,
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
                overflowX: 'auto'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{
                      backgroundColor: colors.primary,
                      color: colors.white
                    }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Phone</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Cost/Sqft</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Completion Time</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '12px 15px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contractors.map((contractor, index) => (
                      <tr key={index} style={{
                        borderBottom: `1px solid ${colors.light}`,
                        ':hover': {
                          backgroundColor: colors.paleBlue
                        }
                      }}>
                        <td style={{ padding: '12px 15px' }}>{contractor.name}</td>
                        <td style={{ padding: '12px 15px' }}>{contractor.email}</td>
                        <td style={{ padding: '12px 15px' }}>{contractor.phone || 'N/A'}</td>
                        <td style={{ padding: '12px 15px' }}>₹{contractor.cost}</td>
                        <td style={{ padding: '12px 15px' }}>{contractor.time} days</td>
                        <td style={{ padding: '12px 15px' }}>
                          <span style={{
                            padding: '5px 10px',
                            borderRadius: '20px',
                            backgroundColor: getStatusColor(contractor.status),
                            color: colors.white,
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}>
                            {getStatusIcon(contractor.status)}
                            {contractor.status ? contractor.status.toUpperCase() : 'PENDING'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            <button
                              style={{
                                backgroundColor: colors.success,
                                color: colors.white,
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontSize: '0.8rem'
                              }}
                              onClick={() => updateContractorStatus(contractor.id, 'approved')}
                            >
                              <FaCheck size={12} /> Approve
                            </button>
                            <button
                              style={{
                                backgroundColor: colors.accent,
                                color: colors.white,
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontSize: '0.8rem'
                              }}
                              onClick={() => updateContractorStatus(contractor.id, 'rejected')}
                            >
                              <FaTimes size={12} /> Reject
                            </button>
                            <button
                              style={{
                                backgroundColor: 'transparent',
                                color: colors.accent,
                                border: `1px solid ${colors.accent}`,
                                padding: '6px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontSize: '0.8rem'
                              }}
                              onClick={() => deleteContractor(contractor.id)}
                            >
                              <FaTrash size={12} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ 
                color: colors.text,
                margin: 0,
                fontWeight: '500'
              }}>
                User Requests ({userRequests.length})
              </h3>
            </div>

            {userRequests.length === 0 ? (
              <div style={{ 
                backgroundColor: colors.white, 
                borderRadius: '10px', 
                padding: '40px 20px', 
                textAlign: 'center',
                boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
                marginBottom: '30px'
              }}>
                <p style={{ 
                  color: colors.text,
                  fontSize: '1rem',
                  opacity: 0.7
                }}>
                  No user requests yet. When users submit requests, they'll appear here.
                </p>
              </div>
            ) : (
              <div style={{
                backgroundColor: colors.white,
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
                overflowX: 'auto'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{
                      backgroundColor: colors.primary,
                      color: colors.white
                    }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Request Type</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Details</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Budget</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Timeframe</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Date</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '12px 15px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userRequests.map((request, index) => (
                      <tr key={index} style={{
                        borderBottom: `1px solid ${colors.light}`,
                        ':hover': {
                          backgroundColor: colors.paleBlue
                        }
                      }}>
                        <td style={{ padding: '12px 15px' }}>
                          {request.type === 'custom' ? 'Custom Project' : 'Contractor Request'}
                          {request.type === 'custom' && (
                            <div style={{ fontSize: '0.8rem', color: colors.text, marginTop: '4px' }}>
                              {request.projectTitle}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '12px 15px' }}>
                          {request.type === 'custom' ? (
                            <div style={{ maxWidth: '300px', whiteSpace: 'pre-line' }}>
                              {request.description}
                            </div>
                          ) : (
                            <div>
                              <div>Contractor: {request.name}</div>
                              <div>Cost: ₹{request.cost}/sqft</div>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '12px 15px' }}>
                          {request.type === 'custom' ? (
                            `₹${request.budget}`
                          ) : (
                            `₹${request.cost}/sqft`
                          )}
                        </td>
                        <td style={{ padding: '12px 15px' }}>
                          {request.type === 'custom' ? (
                            `${request.completionPeriod} days`
                          ) : (
                            `${request.time} days`
                          )}
                        </td>
                        <td style={{ padding: '12px 15px' }}>
                          {new Date(request.requestDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td style={{ padding: '12px 15px' }}>
                          <span style={{
                            padding: '5px 10px',
                            borderRadius: '20px',
                            backgroundColor: getStatusColor(request.status),
                            color: colors.white,
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}>
                            {getStatusIcon(request.status)}
                            {request.status ? request.status.toUpperCase() : 'PENDING'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            <button
                              style={{
                                backgroundColor: colors.success,
                                color: colors.white,
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontSize: '0.8rem'
                              }}
                              onClick={() => updateRequestStatus(request.id, 'approved')}
                            >
                              <FaCheck size={12} /> Approve
                            </button>
                            <button
                              style={{
                                backgroundColor: colors.accent,
                                color: colors.white,
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontSize: '0.8rem'
                              }}
                              onClick={() => updateRequestStatus(request.id, 'rejected')}
                            >
                              <FaTimes size={12} /> Reject
                            </button>
                            <button
                              style={{
                                backgroundColor: 'transparent',
                                color: colors.accent,
                                border: `1px solid ${colors.accent}`,
                                padding: '6px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontSize: '0.8rem'
                              }}
                              onClick={() => deleteRequest(request.id)}
                            >
                              <FaTrash size={12} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Navigation Item Component
const NavItem = ({ icon, text, active = false, onClick, colors }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 15px',
        cursor: 'pointer',
        backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
        color: active ? colors.white : 'rgba(255,255,255,0.8)',
        borderRadius: '6px',
        marginBottom: '5px',
        transition: 'all 0.2s ease',
        fontWeight: active ? '500' : '400',
        ':hover': {
          backgroundColor: 'rgba(255,255,255,0.1)',
          color: colors.white
        }
      }}
    >
      <span style={{ 
        marginRight: '12px', 
        display: 'flex', 
        alignItems: 'center',
        fontSize: '1rem',
        opacity: active ? 1 : 0.8
      }}>
        {icon}
      </span>
      <span style={{ fontSize: '0.95rem' }}>{text}</span>
      {active && (
        <div style={{ 
          marginLeft: 'auto',
          width: '4px',
          height: '20px',
          backgroundColor: colors.secondary,
          borderRadius: '2px'
        }}></div>
      )}
    </div>
  );
};
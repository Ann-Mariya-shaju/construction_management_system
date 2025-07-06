import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Badge, Spinner, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaStar, FaRegStar, FaBuilding, FaHardHat, FaClipboardList, FaUserClock, FaHome, FaSignOutAlt, FaEnvelope, FaPhone, FaCalendarAlt, FaMoneyBillWave, FaRulerCombined } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [approvedContractors, setApprovedContractors] = useState([]);
  const [requestedWorks, setRequestedWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contractors');
  const [userName, setUserName] = useState('John Doe');
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  
  // Updated color scheme with #D0B8A8 and #DFD3C3
  const colors = {
    primary: '#D0B8A8',         // Primary color (peach)
    secondary: '#DFD3C3',       // Secondary color (light beige)
    accent: '#A45C40',         // Darker peach for contrast
    success: '#5C8D89',        // Muted teal
    warning: '#E4A444',        // Gold
    info: '#7D9D9C',           // Dusty teal
    light: '#F8EDE3',          // Very light peach
    dark: '#6B4F4F',           // Dark brown
    background: '#F9F5F0',     // Off-white with peach tint
    text: '#5E4A4A',           // Dark brown-gray
    white: '#FFFFFF',
    paleGreen: '#E8F8F5',      // Very pale green
    paleBlue: '#EBF5FB'        // Very pale blue
  };

  // Form states
  const [requestForm, setRequestForm] = useState({
    projectTitle: '',
    squareFeet: '',
    budget: '',
    completionPeriod: '',
    description: ''
  });
  
  // Review states
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: ''
  });

  useEffect(() => {
    // Fetch approved contractors
    const fetchApprovedContractors = () => {
      try {
        const storedData = localStorage.getItem('contractorWorks');
        const parsedData = storedData ? JSON.parse(storedData) : [];
        const approved = parsedData.filter(c => c.status === 'approved');
        
        // Add reviews field if it doesn't exist
        const contractorsWithReviews = approved.map(c => ({
          ...c,
          reviews: c.reviews || [],
          avgRating: c.reviews ? 
            c.reviews.reduce((sum, review) => sum + review.rating, 0) / c.reviews.length : 
            0
        }));
        
        setApprovedContractors(contractorsWithReviews);
      } catch (error) {
        console.error("Error loading contractor data:", error);
        toast.error("Error loading contractor data");
      }
    };

    // Fetch requested works
    const fetchRequestedWorks = () => {
      try {
        const storedRequests = localStorage.getItem('requestedWorks');
        const parsedRequests = storedRequests ? JSON.parse(storedRequests) : [];
        setRequestedWorks(parsedRequests);
      } catch (error) {
        console.error("Error loading requested works:", error);
        toast.error("Error loading requested works");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedContractors();
    fetchRequestedWorks();
  }, []);

  const handleRequestFormChange = (e) => {
    const { name, value } = e.target;
    setRequestForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleReviewFormChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const setRating = (rating) => {
    setReviewForm(prev => ({
      ...prev,
      rating
    }));
  };

 const handleRequestSubmit = async (e) => {
  e.preventDefault();

  const newRequest = {
    email: "user@gmail.com", // TODO: Replace with logged-in user's email if using auth
    projectTitle: requestForm.projectTitle,
    squareFeet: requestForm.squareFeet,
    budget: requestForm.budget,
    completionPeriod: requestForm.completionPeriod,
    description: requestForm.description
  };

  try {
    const response = await fetch("http://localhost:4005/request/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRequest)
    });

    if (response.status === 201) {
      toast.success('Your custom request has been submitted successfully!');

      setRequestForm({
        projectTitle: '',
        squareFeet: '',
        budget: '',
        completionPeriod: '',
        description: ''
      });
      setShowModal(false);
    } else {
      const msg = await response.text();
      toast.error(`Submission failed: ${msg}`);
    }
  } catch (err) {
    console.error("Error submitting request:", err);
    toast.error("Failed to submit request. Please try again.");
  }
};
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedContractor || !reviewForm.rating) {
      toast.warning("Please select a rating before submitting.");
      return;
    }
    
    try {
      const newReview = {
        id: Date.now().toString(),
        contractorId: selectedContractor.id,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: new Date().toISOString(),
        userName: userName
      };
      
      // Update contractor in localStorage with new review
      const allContractors = JSON.parse(localStorage.getItem('contractorWorks') || '[]');
      const updatedContractors = allContractors.map(c => {
        if (c.id === selectedContractor.id) {
          const reviews = c.reviews || [];
          return {
            ...c,
            reviews: [...reviews, newReview]
          };
        }
        return c;
      });
      
      localStorage.setItem('contractorWorks', JSON.stringify(updatedContractors));
      
      // Update state
      const updatedApproved = approvedContractors.map(c => {
        if (c.id === selectedContractor.id) {
          const reviews = c.reviews || [];
          const newReviews = [...reviews, newReview];
          return {
            ...c,
            reviews: newReviews,
            avgRating: newReviews.reduce((sum, review) => sum + review.rating, 0) / newReviews.length
          };
        }
        return c;
      });
      
      setApprovedContractors(updatedApproved);
      
      // Reset form and close modal
      setReviewForm({
        rating: 0,
        comment: ''
      });
      setShowReviewModal(false);
      setSelectedContractor(null);
      
      // Show success message
      toast.success('Your review has been submitted successfully!');
      
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const handleRequestContractor = (contractor) => {
    try {
      const newRequest = {
        requestId: Date.now().toString(),
        contractorId: contractor.id,
        name: contractor.name,
        cost: contractor.cost,
        time: contractor.time,
        status: 'pending',
        requestDate: new Date().toISOString(),
        type: 'contractor'
      };

      const existingRequests = JSON.parse(localStorage.getItem('requestedWorks') || '[]');
      existingRequests.push(newRequest);
      localStorage.setItem('requestedWorks', JSON.stringify(existingRequests));

      // Update the local state
      setRequestedWorks([...requestedWorks, newRequest]);
      
      // Show success message
      toast.success(`Requested contractor: ${contractor.name}`);
    } catch (error) {
      console.error("Error adding request:", error);
      toast.error("Failed to request contractor");
    }
  };
  
  const openReviewModal = (contractor) => {
    setSelectedContractor(contractor);
    setShowReviewModal(true);
  };

  // Star display component
  const StarRating = ({ rating, interactive = false, onRatingChange }) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (interactive) {
        stars.push(
          <span 
            key={i} 
            onClick={() => onRatingChange(i)} 
            style={{ cursor: 'pointer', color: i <= rating ? colors.warning : colors.light, marginRight: '2px', fontSize: '24px' }}
          >
            {i <= rating ? <FaStar /> : <FaRegStar />}
          </span>
        );
      } else {
        stars.push(
          <span 
            key={i} 
            style={{ color: i <= rating ? colors.warning : colors.light, marginRight: '2px' }}
          >
            {i <= rating ? <FaStar /> : <FaRegStar />}
          </span>
        );
      }
    }
    
    return <div>{stars}</div>;
  };

  const getStatusColor = (status) => {
    if (status === 'approved') return colors.success;
    if (status === 'rejected') return colors.accent;
    return colors.warning;
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
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: colors.background }}>
      {/* Side Navigation Bar - Fixed scrolling issue */}
      <div style={{
        width: '280px',
        backgroundColor: colors.primary,
        color: colors.dark,
        position: 'fixed',
        height: '100vh',
        boxShadow: '2px 0 15px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* User Profile Section */}
        <div style={{
          padding: '20px',
          textAlign: 'center',
          borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
          flexShrink: 0
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            margin: '0 auto 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
            color: colors.dark,
            border: `2px solid ${colors.dark}`
          }}>
            {userName.charAt(0)}
          </div>
          <h5 style={{ color: colors.dark, marginBottom: '5px', fontWeight: '600' }}>{userName}</h5>
          <p style={{ color: colors.accent, fontSize: '0.9rem', fontWeight: '500' }}>Construction Portal</p>
        </div>

        {/* Logout Button - Moved up */}
        <div style={{ 
          padding: '20px',
          flexShrink: 0,
          borderBottom: `1px solid rgba(0, 0, 0, 0.1)`
        }}>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: colors.accent,
              color: colors.white,
              border: 'none',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#8C3D20';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = colors.accent;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <FaSignOutAlt style={{ fontSize: '1.1rem' }} /> Logout
          </button>
        </div>

        {/* Scrollable Navigation Links Container */}
        <div style={{ 
          flex: 1,
          overflowY: 'auto',
          padding: '20px'
        }}>
          <NavItem 
            icon={<FaHardHat style={{ fontSize: '1.1rem' }} />} 
            text="Contractors" 
            active={activeTab === 'contractors'} 
            onClick={() => setActiveTab('contractors')}
            colors={colors}
          />
          
          <NavItem 
            icon={<FaClipboardList style={{ fontSize: '1.1rem' }} />} 
            text="My Requests" 
            active={activeTab === 'requests'} 
            onClick={() => setActiveTab('requests')}
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
        
        {/* Header */}
        <div style={{ 
          backgroundColor: colors.white,
          borderRadius: '10px',
          padding: '25px', 
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          borderLeft: `5px solid ${colors.primary}`
        }}>
          <div>
            <h2 style={{ 
              color: colors.dark, 
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              {activeTab === 'contractors' ? (
                <>
                  <FaHardHat /> Available Contractors
                </>
              ) : (
                <>
                  <FaClipboardList /> My Requests
                </>
              )}
            </h2>
          </div>
          
          {activeTab === 'contractors' && (
            <button 
              onClick={() => setShowModal(true)}
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#C0A898';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = colors.primary;
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <FaPlus /> New Request
            </button>
          )}
        </div>

        {/* Content */}
        <div style={{ 
          backgroundColor: colors.white, 
          borderRadius: '10px', 
          padding: '25px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          minHeight: '60vh'
        }}>
          {activeTab === 'contractors' ? (
            <>
              {approvedContractors.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px 20px',
                  backgroundColor: colors.light,
                  borderRadius: '8px'
                }}>
                  <p style={{ 
                    color: colors.text,
                    fontSize: '1.1rem',
                    opacity: 0.8
                  }}>
                    No approved contractors available at the moment.
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
                        color: colors.dark
                      }}>
                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Contractor</th>
                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Rating</th>
                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Cost/Sqft</th>
                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Completion Time</th>
                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Previous Works</th>
                        <th style={{ padding: '12px 15px', textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedContractors.map((contractor, index) => (
                        <tr key={index} style={{
                          borderBottom: `1px solid ${colors.secondary}`,
                          ':hover': {
                            backgroundColor: colors.light
                          }
                        }}>
                          <td style={{ padding: '12px 15px' }}>
                            <div style={{ fontWeight: '600' }}>{contractor.name}</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{contractor.email}</div>
                            {contractor.phone && (
                              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                <FaPhone style={{ marginRight: '5px' }} />
                                {contractor.phone}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '12px 15px' }}>
                            <StarRating rating={Math.round(contractor.avgRating || 0)} />
                            <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                              ({contractor.reviews?.length || 0} reviews)
                            </div>
                          </td>
                          <td style={{ padding: '12px 15px' }}>₹{contractor.cost}</td>
                          <td style={{ padding: '12px 15px' }}>{contractor.time} days</td>
                          <td style={{ padding: '12px 15px', maxWidth: '300px' }}>
                            <div style={{ 
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '100%'
                            }}>
                              {contractor.previousWorks}
                            </div>
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
                                onClick={() => handleRequestContractor(contractor)}
                              >
                                Request
                              </button>
                              <button
                                style={{
                                  backgroundColor: colors.warning,
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
                                onClick={() => openReviewModal(contractor)}
                              >
                                Review
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <>
              {requestedWorks.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px 20px',
                  backgroundColor: colors.light,
                  borderRadius: '8px'
                }}>
                  <p style={{ 
                    color: colors.text,
                    fontSize: '1.1rem',
                    marginBottom: '20px',
                    opacity: 0.8
                  }}>
                    You haven't made any requests yet.
                  </p>
                  <button 
                    onClick={() => setShowModal(true)}
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.white,
                      border: 'none',
                      padding: '12px 25px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      margin: '0 auto',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#C0A898';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = colors.primary;
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <FaPlus /> Create New Request
                  </button>
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
                        color: colors.dark
                      }}>
                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Request Type</th>
                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Details</th>
                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Budget/Price</th>
                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Timeframe</th>
                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Request Date</th>
                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requestedWorks.map((request, index) => (
                        <tr key={index} style={{
                          borderBottom: `1px solid ${colors.secondary}`,
                          ':hover': {
                            backgroundColor: colors.light
                          }
                        }}>
                          <td style={{ padding: '12px 15px' }}>
                            {request.type === 'custom' ? 'Custom Project' : 'Contractor Request'}
                          </td>
                          <td style={{ padding: '12px 15px' }}>
                            {request.type === 'custom' ? (
                              <>
                                <div style={{ fontWeight: '600' }}>{request.projectTitle}</div>
                                <div style={{ 
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  maxWidth: '200px'
                                }}>
                                  {request.description}
                                </div>
                              </>
                            ) : (
                              <>
                                <div style={{ fontWeight: '600' }}>{request.name}</div>
                                <div>Cost: ₹{request.cost}/sqft</div>
                              </>
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
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
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
                              {request.status?.toUpperCase() || 'PENDING'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Custom Request Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton style={{ 
          backgroundColor: colors.primary,
          color: colors.white,
          borderBottom: `1px solid ${colors.secondary}`
        }}>
          <Modal.Title>Create Custom Request</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: colors.background }}>
          <Form onSubmit={handleRequestSubmit}>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="projectTitle" label="Project Title">
                <Form.Control 
                  type="text" 
                  placeholder="Enter project title"
                  name="projectTitle"
                  value={requestForm.projectTitle}
                  onChange={handleRequestFormChange}
                  required
                  style={{ backgroundColor: colors.white, borderColor: colors.secondary }}
                />
              </FloatingLabel>
            </Form.Group>
            
            <Row className="mb-3">
              <Col md>
                <FloatingLabel controlId="squareFeet" label="Square Feet">
                  <Form.Control 
                    type="number" 
                    placeholder="Enter square feet"
                    name="squareFeet"
                    value={requestForm.squareFeet}
                    onChange={handleRequestFormChange}
                    required
                    style={{ backgroundColor: colors.white, borderColor: colors.secondary }}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="budget" label="Budget (₹)">
                  <Form.Control 
                    type="number" 
                    placeholder="Enter budget"
                    name="budget"
                    value={requestForm.budget}
                    onChange={handleRequestFormChange}
                    required
                    style={{ backgroundColor: colors.white, borderColor: colors.secondary }}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="completionPeriod" label="Completion Period (days)">
                  <Form.Control 
                    type="number" 
                    placeholder="Enter completion period"
                    name="completionPeriod"
                    value={requestForm.completionPeriod}
                    onChange={handleRequestFormChange}
                    required
                    style={{ backgroundColor: colors.white, borderColor: colors.secondary }}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <FloatingLabel controlId="description" label="Project Description">
                <Form.Control 
                  as="textarea" 
                  placeholder="Enter project description"
                  name="description"
                  value={requestForm.description}
                  onChange={handleRequestFormChange}
                  required
                  style={{ height: '100px', backgroundColor: colors.white, borderColor: colors.secondary }}
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ 
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.secondary}`
        }}>
          <button 
            onClick={() => setShowModal(false)}
            style={{
              backgroundColor: colors.light,
              color: colors.text,
              border: 'none',
              padding: '8px 15px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#E0D5C8';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = colors.light;
            }}
          >
            Cancel
          </button>
          <button 
            onClick={handleRequestSubmit}
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              border: 'none',
              padding: '8px 15px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#C0A898';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = colors.primary;
            }}
          >
            Submit Request
          </button>
        </Modal.Footer>
      </Modal>
      
      {/* Review Modal */}
      <Modal 
        show={showReviewModal} 
        onHide={() => setShowReviewModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton style={{ 
          backgroundColor: colors.primary,
          color: colors.white,
          borderBottom: `1px solid ${colors.secondary}`
        }}>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: colors.background }}>
          {selectedContractor && (
            <Form onSubmit={handleReviewSubmit}>
              <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <h5 style={{ color: colors.dark }}>{selectedContractor.name}</h5>
                <div style={{ margin: '15px 0' }}>
                  <StarRating 
                    rating={reviewForm.rating} 
                    interactive={true} 
                    onRatingChange={setRating} 
                  />
                </div>
              </div>
              
              <Form.Group className="mb-3">
                <FloatingLabel controlId="comment" label="Your Review">
                  <Form.Control 
                    as="textarea" 
                    placeholder="Write your review here..."
                    name="comment"
                    value={reviewForm.comment}
                    onChange={handleReviewFormChange}
                    required
                    style={{ height: '120px', backgroundColor: colors.white, borderColor: colors.secondary }}
                  />
                </FloatingLabel>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer style={{ 
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.secondary}`
        }}>
          <button 
            onClick={() => setShowReviewModal(false)}
            style={{
              backgroundColor: colors.light,
              color: colors.text,
              border: 'none',
              padding: '8px 15px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#E0D5C8';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = colors.light;
            }}
          >
            Cancel
          </button>
          <button 
            onClick={handleReviewSubmit}
            disabled={reviewForm.rating === 0}
            style={{
              backgroundColor: reviewForm.rating === 0 ? '#D0B8A8' : colors.primary,
              color: colors.white,
              border: 'none',
              padding: '8px 15px',
              borderRadius: '6px',
              cursor: reviewForm.rating === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              if (reviewForm.rating !== 0) {
                e.target.style.backgroundColor = '#C0A898';
              }
            }}
            onMouseOut={(e) => {
              if (reviewForm.rating !== 0) {
                e.target.style.backgroundColor = colors.primary;
              }
            }}
          >
            Submit Review
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

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
        backgroundColor: active ? 'rgba(0,0,0,0.05)' : 'transparent',
        color: active ? colors.dark : colors.text,
        borderRadius: '6px',
        marginBottom: '5px',
        transition: 'all 0.2s ease',
        fontWeight: active ? '600' : '400'
      }}
      onMouseOver={(e) => {
        if (!active) {
          e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
          e.target.style.color = colors.dark;
        }
      }}
      onMouseOut={(e) => {
        if (!active) {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = colors.text;
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
          backgroundColor: colors.accent,
          borderRadius: '2px'
        }}></div>
      )}
    </div>
  );
};

export default UserDashboard;
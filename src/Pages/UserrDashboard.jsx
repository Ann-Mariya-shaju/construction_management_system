import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Badge, Spinner, Modal, Form, FloatingLabel, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaStar, FaRegStar, FaBuilding, FaHardHat, FaClipboardList, FaUserClock, FaHome, FaSignOutAlt } from 'react-icons/fa';
import bg from '../assets/home.png'; // Make sure this path is correct

const UserDashboard = () => {
  const navigate = useNavigate();
  const [approvedContractors, setApprovedContractors] = useState([]);
  const [requestedWorks, setRequestedWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contractors');
  const [userName, setUserName] = useState('John Doe'); // Replace with actual user data
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  
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

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    
    try {
      const newCustomRequest = {
        id: Date.now().toString(),
        projectTitle: requestForm.projectTitle,
        squareFeet: requestForm.squareFeet,
        budget: requestForm.budget,
        completionPeriod: requestForm.completionPeriod,
        description: requestForm.description,
        status: 'pending',
        requestDate: new Date().toISOString(),
        type: 'custom'
      };

      // Store in localStorage
      const existingRequests = JSON.parse(localStorage.getItem('requestedWorks') || '[]');
      existingRequests.push(newCustomRequest);
      localStorage.setItem('requestedWorks', JSON.stringify(existingRequests));

      // Update state
      setRequestedWorks([...requestedWorks, newCustomRequest]);
      
      // Reset form and close modal
      setRequestForm({
        projectTitle: '',
        squareFeet: '',
        budget: '',
        completionPeriod: '',
        description: ''
      });
      setShowModal(false);
      
      // Show success message
      alert('Your custom request has been submitted successfully!');
      
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedContractor || !reviewForm.rating) {
      alert("Please select a rating before submitting.");
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
      alert('Your review has been submitted successfully!');
      
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  const handleRequestContractor = (contractor) => {
    // Add the contractor request to localStorage
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
      
      // Show alert
      alert(`Requested contractor: ${contractor.name}`);
    } catch (error) {
      console.error("Error adding request:", error);
      alert("Failed to request contractor");
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
            style={{ cursor: 'pointer', color: i <= rating ? '#ffc107' : '#e4e5e9', marginRight: '2px', fontSize: '24px' }}
          >
            {i <= rating ? <FaStar /> : <FaRegStar />}
          </span>
        );
      } else {
        stars.push(
          <span 
            key={i} 
            style={{ color: i <= rating ? '#ffc107' : '#e4e5e9', marginRight: '2px' }}
          >
            {i <= rating ? <FaStar /> : <FaRegStar />}
          </span>
        );
      }
    }
    
    return <div>{stars}</div>;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  return (
    <div 
      style={{ 
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex'
      }}
    >
      {/* Side Navigation Bar */}
      <div style={{
        width: '280px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: '20px 0',
        boxShadow: '5px 0 15px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0
      }}>
        {/* User Profile Section */}
        <div style={{
          padding: '20px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 193, 7, 0.2)',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            margin: '0 auto 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
            color: '#ffc107'
          }}>
            {userName.charAt(0)}
          </div>
          <h5 style={{ color: 'white', marginBottom: '5px' }}>{userName}</h5>
          <p style={{ color: '#ffc107', fontSize: '0.9rem' }}>Construction Portal</p>
        </div>

        {/* Navigation Links */}
        <Nav variant="pills" className="flex-column" activeKey={activeTab}>
          <Nav.Item style={{ marginBottom: '5px' }}>
            <Nav.Link 
              eventKey="contractors" 
              onClick={() => setActiveTab('contractors')}
              style={{
                color: activeTab === 'contractors' ? 'black' : 'white',
                backgroundColor: activeTab === 'contractors' ? '#ffc107' : 'transparent',
                borderRadius: '0',
                padding: '12px 25px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: '500'
              }}
            >
              <FaHardHat /> Contractors
            </Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ marginBottom: '5px' }}>
            <Nav.Link 
              eventKey="requests" 
              onClick={() => setActiveTab('requests')}
              style={{
                color: activeTab === 'requests' ? 'black' : 'white',
                backgroundColor: activeTab === 'requests' ? '#ffc107' : 'transparent',
                borderRadius: '0',
                padding: '12px 25px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: '500'
              }}
            >
              <FaClipboardList /> My Requests
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Bottom Logout Button */}
        <div style={{ marginTop: 'auto', padding: '20px' }}>
          <Button 
            variant="outline-warning" 
            className="w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={() => navigate('/role-selection')}
          >
            <FaSignOutAlt /> Logout
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.85)', 
          borderRadius: '15px', 
          padding: '20px',
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ color: 'white', margin: 0 }}>
            {activeTab === 'contractors' ? (
              <>
                <FaHardHat className="me-2" /> Available Contractors
              </>
            ) : (
              <>
                <FaClipboardList className="me-2" /> My Requests
              </>
            )}
          </h2>
          
          {activeTab === 'contractors' && (
            <Button 
              variant="warning" 
              className="d-flex align-items-center gap-2"
              onClick={() => setShowModal(true)}
            >
              <FaPlus /> New Request
            </Button>
          )}
        </div>

        {/* Content */}
        <div style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.85)', 
          borderRadius: '15px', 
          padding: '25px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          minHeight: '60vh'
        }}>
          {activeTab === 'contractors' && (
            <>
              {approvedContractors.length === 0 ? (
                <div className="text-center py-5">
                  <p style={{ color: 'white', fontSize: '1.1rem' }}>No approved contractors available at the moment.</p>
                </div>
              ) : (
                <Row>
                  {approvedContractors.map((contractor, idx) => (
                    <Col key={idx} lg={4} md={6} className="mb-4">
                      <Card style={{ 
                        height: '100%', 
                        backgroundColor: 'rgba(40, 40, 40, 0.95)', 
                        color: 'white',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)',
                        border: '1px solid rgba(255, 193, 7, 0.3)',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                      }} className="contractor-card">
                        {contractor.imageUrls && contractor.imageUrls.length > 0 ? (
                          <div style={{ position: 'relative', height: '200px' }}>
                            <Card.Img 
                              variant="top" 
                              src={contractor.imageUrls[0]} 
                              style={{ height: '100%', objectFit: 'cover' }} 
                            />
                            <div style={{ 
                              position: 'absolute', 
                              top: '15px', 
                              right: '15px',
                              backgroundColor: 'rgba(0,0,0,0.7)',
                              borderRadius: '5px',
                              padding: '5px 10px'
                            }}>
                              <Badge bg="warning" text="dark">₹{contractor.cost}/sqft</Badge>
                            </div>
                          </div>
                        ) : (
                          <div style={{ 
                            height: '180px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 193, 7, 0.1)'
                          }}>
                            <FaBuilding size={60} color="#ffc107" />
                          </div>
                        )}
                        
                        <Card.Body className="d-flex flex-column">
                          <Card.Title style={{ fontSize: '1.3rem', fontWeight: '600' }}>
                            {contractor.name}
                          </Card.Title>
                          
                          <div className="mb-2">
                            <StarRating rating={Math.round(contractor.avgRating || 0)} />
                            <span className="ms-2 text-muted">
                              ({contractor.reviews?.length || 0} reviews)
                            </span>
                          </div>
                          
                          <Card.Text style={{ flex: 1 }}>
                            <div className="mb-2">
                              <span style={{ color: '#aaa' }}>Previous Works:</span><br />
                              <span>{contractor.previousWorks}</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <FaUserClock className="me-2" color="#ffc107" />
                              <span>Completes in {contractor.time} days</span>
                            </div>
                          </Card.Text>
                          
                          <div className="d-flex gap-2 mt-3">
                            <Button 
                              variant="warning" 
                              className="flex-grow-1"
                              onClick={() => handleRequestContractor(contractor)}
                            >
                              Request
                            </Button>
                            <Button 
                              variant="outline-light" 
                              className="flex-grow-1"
                              onClick={() => openReviewModal(contractor)}
                            >
                              Review
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}

          {activeTab === 'requests' && (
            <>
              {requestedWorks.length === 0 ? (
                <div className="text-center py-5">
                  <p style={{ color: 'white', fontSize: '1.1rem' }}>You haven't made any requests yet.</p>
                  <Button 
                    variant="warning" 
                    size="lg"
                    className="mt-3"
                    onClick={() => setShowModal(true)}
                  >
                    <FaPlus className="me-2" /> Create New Request
                  </Button>
                </div>
              ) : (
                <Row>
                  {requestedWorks.map((request, idx) => (
                    <Col key={idx} lg={6} className="mb-4">
                      <Card style={{ 
                        backgroundColor: 'rgba(40, 40, 40, 0.95)', 
                        color: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)',
                        border: '1px solid rgba(255, 193, 7, 0.3)'
                      }}>
                        <Card.Header style={{ 
                          backgroundColor: 'rgba(255, 193, 7, 0.1)', 
                          borderBottom: '1px solid rgba(255, 193, 7, 0.2)',
                          paddingTop: '15px',
                          paddingBottom: '15px'
                        }}>
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">
                              {request.type === 'custom' ? request.projectTitle : `Contractor: ${request.name}`}
                            </h5>
                            <Badge bg={
                              request.status === 'approved' ? 'success' : 
                              request.status === 'rejected' ? 'danger' : 
                              'warning'
                            } style={{ fontSize: '0.8rem', padding: '8px 12px' }}>
                              {request.status?.toUpperCase() || 'PENDING'}
                            </Badge>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          {request.type === 'custom' ? (
                            <>
                              <Row className="mb-3">
                                <Col md={4} className="text-muted">Square Feet:</Col>
                                <Col md={8}>{request.squareFeet} sq.ft</Col>
                              </Row>
                              <Row className="mb-3">
                                <Col md={4} className="text-muted">Budget:</Col>
                                <Col md={8}>₹{request.budget}</Col>
                              </Row>
                              <Row className="mb-3">
                                <Col md={4} className="text-muted">Completion Period:</Col>
                                <Col md={8}>{request.completionPeriod} days</Col>
                              </Row>
                              <Row className="mb-3">
                                <Col md={4} className="text-muted">Description:</Col>
                                <Col md={8}>{request.description}</Col>
                              </Row>
                            </>
                          ) : (
                            <>
                              <Row className="mb-3">
                                <Col md={4} className="text-muted">Contractor:</Col>
                                <Col md={8}>{request.name}</Col>
                              </Row>
                              <Row className="mb-3">
                                <Col md={4} className="text-muted">Cost per sq.ft:</Col>
                                <Col md={8}>₹{request.cost}</Col>
                              </Row>
                              <Row className="mb-3">
                                <Col md={4} className="text-muted">Completion Time:</Col>
                                <Col md={8}>{request.time} days</Col>
                              </Row>
                            </>
                          )}
                          <Row>
                            <Col md={4} className="text-muted">Requested On:</Col>
                            <Col md={8}>{new Date(request.requestDate).toLocaleDateString()}</Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
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
        <Modal.Header closeButton style={{ backgroundColor: '#343a40', color: 'white', borderBottom: '1px solid #ffc107' }}>
          <Modal.Title>Create Custom Request</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#343a40', color: 'white' }}>
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
                  style={{ backgroundColor: '#212529', color: 'white', borderColor: '#495057' }}
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
                    style={{ backgroundColor: '#212529', color: 'white', borderColor: '#495057' }}
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
                    style={{ backgroundColor: '#212529', color: 'white', borderColor: '#495057' }}
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
                    style={{ backgroundColor: '#212529', color: 'white', borderColor: '#495057' }}
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
                  style={{ height: '100px', backgroundColor: '#212529', color: 'white', borderColor: '#495057' }}
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#343a40', borderTop: '1px solid #ffc107' }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleRequestSubmit}>
            Submit Request
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Review Modal */}
      <Modal 
        show={showReviewModal} 
        onHide={() => setShowReviewModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton style={{ backgroundColor: '#343a40', color: 'white', borderBottom: '1px solid #ffc107' }}>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#343a40', color: 'white' }}>
          {selectedContractor && (
            <Form onSubmit={handleReviewSubmit}>
              <div className="mb-4 text-center">
                <h5>{selectedContractor.name}</h5>
                <div className="mt-3 mb-4">
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
                    style={{ height: '120px', backgroundColor: '#212529', color: 'white', borderColor: '#495057' }}
                  />
                </FloatingLabel>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#343a40', borderTop: '1px solid #ffc107' }}>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="warning" 
            onClick={handleReviewSubmit}
            disabled={reviewForm.rating === 0}
          >
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Custom CSS for hover effects */}
      <style jsx>{`
        .contractor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaClipboardList, FaUser, FaPlus, FaSignOutAlt, FaImage } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bg from '../assets/home.png';

export default function ContractorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contractorWorks, setContractorWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    previousWorks: '',
    cost: '',
    time: '',
    images: []
  });

  useEffect(() => {
    // Load contractor works from localStorage
    try {
      const works = JSON.parse(localStorage.getItem('contractorWorks') || '[]');
      setContractorWorks(works);
    } catch (error) {
      console.error("Error loading contractor works:", error);
      toast.error("Error loading your submissions");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    toast.info("Logged out successfully");
  };

  const navigateToContractorDetails = (id) => {
    navigate(`/contractor-details/${id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.previousWorks || !formData.cost || !formData.time) {
      toast.error("Please fill all required fields");
      return;
    }

    const newSubmission = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      requestDate: new Date().toISOString()
    };

    const updatedWorks = [...contractorWorks, newSubmission];
    setContractorWorks(updatedWorks);
    localStorage.setItem('contractorWorks', JSON.stringify(updatedWorks));

    setFormData({
      name: '',
      email: '',
      previousWorks: '',
      cost: '',
      time: '',
      images: []
    });
    setShowForm(false);
    toast.success("Work submitted successfully!");
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const renderContent = () => {
    if (showForm) {
      return (
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderRadius: '10px',
          padding: '25px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#fff',
            marginTop: '0',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FaPlus /> Submit Work
          </h3>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14px'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '14px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14px'
              }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '14px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14px'
              }}>
                Previous Works Description *
              </label>
              <textarea
                name="previousWorks"
                value={formData.previousWorks}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '14px',
                  minHeight: '100px'
                }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '14px'
                }}>
                  Cost per sq.ft (₹) *
                </label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '14px'
                  }}
                  required
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '14px'
                }}>
                  Estimated Time (days) *
                </label>
                <input
                  type="number"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '14px'
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14px'
              }}>
                Upload Work Images (Max 5)
              </label>
              <div style={{
                border: '1px dashed rgba(255,255,255,0.3)',
                borderRadius: '6px',
                padding: '20px',
                textAlign: 'center',
                backgroundColor: 'rgba(255,255,255,0.05)',
                marginBottom: '10px'
              }}>
                <input
                  type="file"
                  id="image-upload"
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="image-upload"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.7)'
                  }}
                >
                  <FaImage style={{ fontSize: '24px', marginBottom: '10px' }} />
                  <span>Click to upload images</span>
                  <span style={{ fontSize: '12px', marginTop: '5px' }}>JPEG, PNG (Max 5MB each)</span>
                </label>
              </div>

              {formData.images.length > 0 && (
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                  gap: '10px',
                  marginTop: '15px'
                }}>
                  {formData.images.map((img, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <img
                        src={img}
                        alt={`Work ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '6px'
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeImage(index);
                        }}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          backgroundColor: 'rgba(220,53,69,0.8)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '6px',
                  backgroundColor: '#3a7bd5',
                  backgroundImage: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Submit Work
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              borderRadius: '10px',
              padding: '25px',
              marginBottom: '25px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#fff',
                marginTop: '0',
                marginBottom: '15px'
              }}>Welcome to Contractor Dashboard</h3>
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '15px',
                lineHeight: '1.6'
              }}>
                Manage your work submissions and track their status. Use the sidebar to navigate between different sections.
              </p>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#3a7bd5',
                  backgroundImage: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '15px',
                  boxShadow: '0 4px 15px rgba(0,123,255,0.3)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <FaPlus /> Submit Work
              </button>
            </div>

            <div style={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              borderRadius: '10px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#fff',
                marginTop: '0',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>Recent Submissions</span>
                <span style={{
                  fontSize: '14px',
                  backgroundColor: 'rgba(0,210,255,0.2)',
                  color: '#00d2ff',
                  padding: '3px 10px',
                  borderRadius: '20px'
                }}>
                  {contractorWorks.length} Works
                </span>
              </h3>

              {loading ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '30px 0'
                }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTop: '3px solid #3a7bd5',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                </div>
              ) : contractorWorks.length === 0 ? (
                <div style={{
                  padding: '30px 0',
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.6)'
                }}>
                  <p>No works submitted yet. Click the button above to submit your first work.</p>
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  {contractorWorks.slice(0, 3).map((work) => (
                    <div 
                      key={work.id} 
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        padding: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'pointer'
                      }}
                      onClick={() => navigateToContractorDetails(work.id)}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div>
                        <h5 style={{ 
                          margin: '0 0 5px', 
                          color: 'white',
                          fontSize: '16px',
                          fontWeight: '500'
                        }}>
                          {work.name}
                        </h5>
                        <p style={{ 
                          margin: '0', 
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.6)'
                        }}>
                          ₹{work.cost}/sq.ft • {work.time} days
                        </p>
                      </div>
                      <div>
                        <span style={{
                          padding: '5px 10px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: work.status === 'approved' ? 'rgba(40, 167, 69, 0.2)' : 
                                           work.status === 'rejected' ? 'rgba(220, 53, 69, 0.2)' : 
                                           'rgba(255, 193, 7, 0.2)',
                          color: work.status === 'approved' ? '#28a745' : 
                                 work.status === 'rejected' ? '#dc3545' : 
                                 '#ffc107',
                          border: `1px solid ${work.status === 'approved' ? 'rgba(40, 167, 69, 0.3)' : 
                                                work.status === 'rejected' ? 'rgba(220, 53, 69, 0.3)' : 
                                                'rgba(255, 193, 7, 0.3)'}`
                        }}>
                          {work.status ? work.status.toUpperCase() : 'PENDING'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'submissions':
        return (
          <div className="submissions-content">
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              borderRadius: '10px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#fff',
                  margin: '0'
                }}>
                  My Submissions
                </h3>
                <button
                  onClick={() => setShowForm(true)}
                  style={{
                    padding: '8px 15px',
                    borderRadius: '8px',
                    backgroundColor: '#3a7bd5',
                    backgroundImage: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
                    border: 'none',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,123,255,0.3)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <FaPlus /> New Submission
                </button>
              </div>
              
              {loading ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '30px 0'
                }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTop: '3px solid #3a7bd5',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                </div>
              ) : contractorWorks.length === 0 ? (
                <div style={{
                  padding: '30px 0',
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.6)'
                }}>
                  <p>No submissions found. Click the button above to create your first submission.</p>
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '20px'
                }}>
                  {contractorWorks.map((work) => (
                    <div 
                      key={work.id} 
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'pointer'
                      }}
                      onClick={() => navigateToContractorDetails(work.id)}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                      }}>
                        <div>
                          <h4 style={{ 
                            margin: '0 0 5px', 
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: '600'
                          }}>
                            {work.name}
                          </h4>
                          <p style={{ 
                            margin: '0', 
                            fontSize: '14px',
                            color: 'rgba(255,255,255,0.6)'
                          }}>
                            {work.email}
                          </p>
                        </div>
                        <span style={{
                          padding: '5px 10px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: work.status === 'approved' ? 'rgba(40, 167, 69, 0.2)' : 
                                           work.status === 'rejected' ? 'rgba(220, 53, 69, 0.2)' : 
                                           'rgba(255, 193, 7, 0.2)',
                          color: work.status === 'approved' ? '#28a745' : 
                                 work.status === 'rejected' ? '#dc3545' : 
                                 '#ffc107',
                          border: `1px solid ${work.status === 'approved' ? 'rgba(40, 167, 69, 0.3)' : 
                                                work.status === 'rejected' ? 'rgba(220, 53, 69, 0.3)' : 
                                                'rgba(255, 193, 7, 0.3)'}`
                        }}>
                          {work.status ? work.status.toUpperCase() : 'PENDING'}
                        </span>
                      </div>

                      {work.images && work.images.length > 0 && (
                        <div style={{
                          width: '100%',
                          height: '120px',
                          borderRadius: '6px',
                          overflow: 'hidden'
                        }}>
                          <img
                            src={work.images[0]}
                            alt="Work preview"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      )}

                      <div style={{
                        display: 'flex',
                        gap: '15px',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '15px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ 
                            fontSize: '12px', 
                            color: 'rgba(255,255,255,0.5)', 
                            display: 'block',
                            marginBottom: '5px'
                          }}>Cost per sq.ft</label>
                          <p style={{ 
                            margin: '0', 
                            color: '#00d2ff',
                            fontWeight: '600'
                          }}>₹{work.cost}</p>
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ 
                            fontSize: '12px', 
                            color: 'rgba(255,255,255,0.5)', 
                            display: 'block',
                            marginBottom: '5px'
                          }}>Estimated Time</label>
                          <p style={{ 
                            margin: '0', 
                            color: '#00d2ff',
                            fontWeight: '600'
                          }}>{work.time} days</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="profile-content">
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              borderRadius: '10px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#fff',
                marginTop: '0',
                marginBottom: '25px',
                textAlign: 'center'
              }}>My Profile</h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '25px'
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,210,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '15px',
                  border: '1px solid rgba(0,210,255,0.3)',
                  fontSize: '40px',
                  color: '#00d2ff'
                }}>
                  {contractorWorks.length > 0 ? contractorWorks[0].name.charAt(0).toUpperCase() : 'C'}
                </div>
                <h4 style={{
                  margin: '0 0 5px',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: '600'
                }}>
                  {contractorWorks.length > 0 ? contractorWorks[0].name : 'Contractor Name'}
                </h4>
                <p style={{
                  margin: '0',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px'
                }}>
                  {contractorWorks.length > 0 ? contractorWorks[0].email : 'contractor@example.com'}
                </p>
              </div>
              
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
                marginBottom: '25px'
              }}>
                <div style={{
                  padding: '15px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <label style={{ 
                        fontSize: '12px', 
                        color: 'rgba(255,255,255,0.5)', 
                        display: 'block',
                        marginBottom: '5px'
                      }}>Total Submissions</label>
                      <p style={{ 
                        margin: '0', 
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>{contractorWorks.length}</p>
                    </div>
                    <div>
                      <label style={{ 
                        fontSize: '12px', 
                        color: 'rgba(255,255,255,0.5)', 
                        display: 'block',
                        marginBottom: '5px'
                      }}>Approved</label>
                      <p style={{ 
                        margin: '0', 
                        color: '#28a745',
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>{contractorWorks.filter(work => work.status === 'approved').length}</p>
                    </div>
                    <div>
                      <label style={{ 
                        fontSize: '12px', 
                        color: 'rgba(255,255,255,0.5)', 
                        display: 'block',
                        marginBottom: '5px'
                      }}>Pending</label>
                      <p style={{ 
                        margin: '0', 
                        color: '#ffc107',
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>
                        {contractorWorks.filter(work => !work.status || work.status === 'pending').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div style={{ padding: '15px' }}>
                  <label style={{ 
                    fontSize: '12px', 
                    color: 'rgba(255,255,255,0.5)', 
                    display: 'block',
                    marginBottom: '5px'
                  }}>Average Cost per sq.ft</label>
                  <p style={{ 
                    margin: '0', 
                    color: '#00d2ff',
                    fontWeight: '600',
                    fontSize: '16px'
                  }}>
                    ₹{contractorWorks.length ? 
                      Math.round(contractorWorks.reduce((sum, work) => sum + parseInt(work.cost || 0), 0) / contractorWorks.length) : 
                      0}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowForm(true)}
                style={{ 
                  padding: '12px',
                  borderRadius: '8px', 
                  backgroundColor: '#3a7bd5',
                  backgroundImage: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,123,255,0.3)',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <FaPlus /> Submit New Work
              </button>
            </div>
          </div>
        );
      default:
        return <div>Unknown tab</div>;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        fontFamily: "'Poppins', sans-serif",
        color: 'white'
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          backgroundColor: 'rgba(0,0,0,0.85)',
          boxShadow: '5px 0 15px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 10,
          borderRight: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        {/* Logo/Title Area */}
        <div
          style={{
            padding: '25px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}
        >
          <h2
            style={{
              margin: '0',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '1px',
              background: 'linear-gradient(90deg, #3a7bd5, #00d2ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase'
            }}
          >
            CONTRACTOR PORTAL
          </h2>
          <div
            style={{
              height: '3px',
              width: '40px',
              background: 'linear-gradient(90deg, #3a7bd5, #00d2ff)',
              margin: '8px auto 0',
              borderRadius: '2px'
            }}
          ></div>
          <p
            style={{
              margin: '5px 0 0',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.6)'
            }}
          >
            Manage Your Projects
          </p>
        </div>

        {/* Menu Items */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0',
            flexGrow: 1
          }}
        >
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setShowForm(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              backgroundColor: activeTab === 'dashboard' && !showForm ? 'rgba(58,123,213,0.2)' : 'transparent',
              border: 'none',
              borderLeft: activeTab === 'dashboard' && !showForm ? '4px solid #3a7bd5' : '4px solid transparent',
              borderRadius: '0',
              color: activeTab === 'dashboard' && !showForm ? 'white' : 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              fontWeight: activeTab === 'dashboard' && !showForm ? '600' : '400',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <FaHome style={{ marginRight: '10px', fontSize: '16px' }} />
            Dashboard
          </button>
          
          <button
            onClick={() => {
              setActiveTab('submissions');
              setShowForm(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              backgroundColor: activeTab === 'submissions' && !showForm ? 'rgba(58,123,213,0.2)' : 'transparent',
              border: 'none',
              borderLeft: activeTab === 'submissions' && !showForm ? '4px solid #3a7bd5' : '4px solid transparent',
              borderRadius: '0',
              color: activeTab === 'submissions' && !showForm ? 'white' : 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              fontWeight: activeTab === 'submissions' && !showForm ? '600' : '400',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <FaClipboardList style={{ marginRight: '10px', fontSize: '16px' }} />
            My Submissions
          </button>
          
          <button
            onClick={() => setShowForm(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              backgroundColor: showForm ? 'rgba(58,123,213,0.2)' : 'transparent',
              border: 'none',
              borderLeft: showForm ? '4px solid #3a7bd5' : '4px solid transparent',
              borderRadius: '0',
              color: showForm ? 'white' : 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              fontWeight: showForm ? '600' : '400',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <FaPlus style={{ marginRight: '10px', fontSize: '16px' }} />
            New Submission
          </button>
          
          <button
            onClick={() => {
              setActiveTab('profile');
              setShowForm(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              backgroundColor: activeTab === 'profile' && !showForm ? 'rgba(58,123,213,0.2)' : 'transparent',
              border: 'none',
              borderLeft: activeTab === 'profile' && !showForm ? '4px solid #3a7bd5' : '4px solid transparent',
              borderRadius: '0',
              color: activeTab === 'profile' && !showForm ? 'white' : 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              fontWeight: activeTab === 'profile' && !showForm ? '600' : '400',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <FaUser style={{ marginRight: '10px', fontSize: '16px' }} />
            My Profile
          </button>
        </div>

        {/* Logout Button */}
        <div
          style={{
            padding: '15px 20px',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '12px',
              backgroundColor: 'rgba(220,53,69,0.1)',
              border: '1px solid rgba(220,53,69,0.3)',
              borderRadius: '8px',
              color: '#dc3545',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(220,53,69,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(220,53,69,0.1)';
            }}
          >
            <FaSignOutAlt style={{ marginRight: '8px', fontSize: '16px' }} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flexGrow: 1,
          padding: '30px',
          overflowY: 'auto'
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}
        >
          <h1
            style={{
              margin: '0',
              fontSize: '24px',
              fontWeight: '700',
              color: 'white'
            }}
          >
            {showForm ? 'Submit New Work' : 
             activeTab === 'dashboard' ? 'Contractor Dashboard' : 
             activeTab === 'submissions' ? 'My Submissions' : 
             activeTab === 'profile' ? 'My Profile' : 'Dashboard'}
          </h1>
        </div>

        {/* Main Content */}
        {renderContent()}
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
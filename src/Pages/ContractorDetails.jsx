import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bg from '../assets/home.png'; // your background image

export default function ContractorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contractor, setContractor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchContractorData = () => {
      try {
        const all = JSON.parse(localStorage.getItem('contractorWorks') || '[]');
        console.log("All contractors:", all); // Debugging
        console.log("Looking for ID:", id); // Debugging
        
        const found = all.find(r => r.id === id);
        
        if (!found) {
          console.log("Contractor not found");
          setError("Contractor not found");
          // Optionally navigate away after a delay
          setTimeout(() => navigate('/contractor-form'), 2000);
        } else {
          console.log("Found contractor:", found);
          setContractor(found);
        }
      } catch (error) {
        console.error("Error fetching contractor:", error);
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchContractorData();
  }, [id, navigate]);
  
  const handleLogout = () => {
    // You can add any logout logic here, such as clearing localStorage tokens, etc.
    localStorage.removeItem('user'); // Remove user data if you store it
    // Redirect to login page or home page
    navigate('/login'); // Update this to your login route
  };
  
  if (loading) {
    return (
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '20px 40px',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderTop: '3px solid #3a7bd5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '15px'
          }}></div>
          <p style={{ color: 'white', margin: 0, fontWeight: '500' }}>Loading details...</p>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: '30px',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '400px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.5)'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto 20px',
            backgroundColor: 'rgba(220,53,69,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{
              fontSize: '40px',
              color: '#dc3545',
              lineHeight: '1'
            }}>×</span>
          </div>
          <h3 style={{ color: 'white', marginBottom: '15px' }}>Error</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }}>{error}</p>
          <button 
            onClick={() => navigate('/contractor-form')}
            style={{
              backgroundColor: '#3a7bd5',
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }
  
  if (!contractor) return null;

  // Calculate status styling
  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '6px 12px',
      borderRadius: '30px',
      color: 'white',
      fontSize: '12px',
      fontWeight: '600',
      letterSpacing: '0.5px',
      display: 'inline-block',
      textTransform: 'uppercase',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    };
    
    if (status === 'approved') {
      return {
        ...baseStyle,
        backgroundColor: '#28a745', 
        border: '1px solid rgba(255,255,255,0.1)',
      };
    } else if (status === 'rejected') {
      return {
        ...baseStyle,
        backgroundColor: '#dc3545',
        border: '1px solid rgba(255,255,255,0.1)',
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: '#ffc107',
        color: '#212529',
        border: '1px solid rgba(0,0,0,0.1)',
      };
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative' // Added to position the logout button
      }}
    >
      {/* Logout Button - Added at top right of the screen */}
      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: 'rgba(220, 53, 69, 0.9)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          transition: 'all 0.2s ease',
          zIndex: 100
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 1)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.9)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <i className="fas fa-sign-out-alt"></i> Logout
      </button>
      
      <div style={{
        maxWidth: '550px',
        width: '100%'
      }}>
        {/* Title Banner - matching the style from the form page */}
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderRadius: '12px',
          padding: '20px 30px',
          marginBottom: '25px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '3px',
            background: 'linear-gradient(90deg, #3a7bd5, #00d2ff, #3a7bd5)'
          }}></div>
          
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '3px',
            background: 'linear-gradient(90deg, #3a7bd5, #00d2ff, #3a7bd5)'
          }}></div>
          
          <h1 style={{ 
            color: 'white',
            fontSize: '28px',
            fontWeight: '700',
            margin: '0',
            letterSpacing: '2px',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            textTransform: 'uppercase'
          }}>
            CONTRACTOR PROFILE
          </h1>
          
          <div style={{
            height: '4px',
            width: '80px',
            background: 'linear-gradient(90deg, #3a7bd5, #00d2ff)',
            margin: '12px auto 0',
            borderRadius: '2px'
          }}></div>
          
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            margin: '10px 0 0',
            fontSize: '14px',
            fontWeight: '300'
          }}>Submission Details</p>
        </div>
        
        {/* Enhanced Details Container */}
        <div
          style={{
            background: 'linear-gradient(145deg, rgba(0,0,0,0.85), rgba(25,25,35,0.9))',
            color: 'white',
            padding: '35px',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1) inset',
            width: '100%',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {/* Status Badge - Positioned prominently at top */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '25px'
          }}>
            <span style={getStatusStyle(contractor.status ? contractor.status.toLowerCase() : 'pending')}>
              {contractor.status ? contractor.status.toUpperCase() : 'PENDING'}
            </span>
          </div>
          
          {/* Profile Details */}
          <div style={{
            padding: '25px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '10px',
            marginBottom: '30px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ 
              textAlign: 'center', 
              marginTop: '0',
              marginBottom: '20px',
              fontSize: '20px',
              fontWeight: '600',
              color: '#fff',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '10px'
            }}>Contractor Information</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '30px', 
                  color: '#3a7bd5', 
                  marginRight: '15px',
                  textAlign: 'center'
                }}>
                  <i className="fas fa-user"></i> {/* Assumes FontAwesome is available */}
                </div>
                <div>
                  <label style={{ 
                    fontSize: '12px', 
                    color: 'rgba(255,255,255,0.5)', 
                    display: 'block',
                    marginBottom: '2px'
                  }}>Full Name</label>
                  <p style={{ margin: '0', fontSize: '16px', fontWeight: '500' }}>{contractor.name}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '30px', 
                  color: '#3a7bd5', 
                  marginRight: '15px',
                  textAlign: 'center'
                }}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <label style={{ 
                    fontSize: '12px', 
                    color: 'rgba(255,255,255,0.5)', 
                    display: 'block',
                    marginBottom: '2px'
                  }}>Email Address</label>
                  <p style={{ margin: '0', fontSize: '16px' }}>{contractor.email}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project Details */}
          <div style={{
            padding: '25px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '10px',
            marginBottom: '30px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ 
              textAlign: 'center', 
              marginTop: '0',
              marginBottom: '20px',
              fontSize: '20px',
              fontWeight: '600',
              color: '#fff',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '10px'
            }}>Project Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ 
                  fontSize: '14px', 
                  color: 'rgba(255,255,255,0.7)', 
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>Previous Works</label>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '15px',
                  lineHeight: '1.5'
                }}>
                  {contractor.previousWorks}
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '20px'
              }}>
                <div style={{ flex: '1' }}>
                  <label style={{ 
                    fontSize: '14px', 
                    color: 'rgba(255,255,255,0.7)', 
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>Cost per sq.ft</label>
                  <div style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    padding: '12px 15px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#00d2ff'
                    }}>₹{contractor.cost}</span>
                  </div>
                </div>
                
                <div style={{ flex: '1' }}>
                  <label style={{ 
                    fontSize: '14px', 
                    color: 'rgba(255,255,255,0.7)', 
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>Estimated Time</label>
                  <div style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    padding: '12px 15px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#00d2ff'
                    }}>{contractor.time} days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project Gallery */}
          {contractor.imageUrls && Array.isArray(contractor.imageUrls) && contractor.imageUrls.length > 0 && (
            <div style={{
              padding: '25px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{ 
                textAlign: 'center', 
                marginTop: '0',
                marginBottom: '20px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#fff',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '10px'
              }}>Project Gallery</h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '15px'
              }}>
                {contractor.imageUrls.map((url, i) => (
                  <div key={i} style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    height: '150px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <img
                      src={url}
                      alt={`Work ${i+1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      padding: '5px 10px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      fontSize: '12px',
                      textAlign: 'center'
                    }}>
                      Project Image {i+1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Button */}
          <div style={{ 
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button 
              onClick={() => navigate('/contractor-form')}
              style={{ 
                padding: '14px 30px', 
                borderRadius: '8px', 
                backgroundColor: '#3a7bd5',
                backgroundImage: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
                border: 'none',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,123,255,0.3)'
              }}
            >
              Back to Form
            </button>
          </div>
          
          {/* Footer */}
          <div style={{ 
            textAlign: 'center',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '25px',
            padding: '15px 0 0',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <p style={{ margin: '0 0 5px' }}>Thank you for your submission</p>
            <p style={{ margin: '0', fontSize: '11px' }}>© 2025 Contractor Portal - All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
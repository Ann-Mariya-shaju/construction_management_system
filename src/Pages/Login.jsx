import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { email, password } = credentials;

    // Admin login
    if (email === 'admin@gmail.com' && password === 'admin123') {
      navigate('/admin-dashboard');
      setIsLoading(false);
      return;
    }

    if (credentials.email === "admin@gmail.com" && credentials.password === "admin123") {
      navigate('/admin-dashboard');
      return;
    }

    // Contractor / User
    if (state?.role === 'contractor') {
      navigate('/contractor-form');
    } else if (state?.role === 'user') {
      navigate('/user-dashboard');
    } else {
      navigate('/role-selection');
    }
  };


    

  //   try {
  //     const response = await fetch('http://localhost:4005/user/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(credentials)
  //     });

  //     if (response.status === 201) {
  //       if (state?.role === 'contractor') {
  //         navigate('/contractor-form');
  //       } else {
  //         navigate('/user-dashboard');
  //       }
  //     } else {
  //       const data = await response.json();
  //       setError(data.message || "Invalid credentials");
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     setError("Network error. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" 
         style={{ 
           background: 'linear-gradient(to bottom, #2c3e50, #4a6491)',
           position: 'relative',
           padding: '20px',
           overflow: 'hidden'
         }}>
      
      {/* Animated Construction House */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '20%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        animation: 'float 6s ease-in-out infinite',
        display: window.innerWidth > 768 ? 'block' : 'none'
      }}>
        <div style={{
          position: 'relative',
          width: '250px',
          height: '250px'
        }}>
          {/* House Structure */}
          <div style={{
            position: 'absolute',
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '180px',
            height: '120px',
            backgroundColor: '#e67e22',
            borderRadius: '10px 10px 0 0',
            border: '3px solid #d35400'
          }}>
            {/* Roof */}
            <div style={{
              position: 'absolute',
              top: '-40px',
              left: '-20px',
              width: '220px',
              height: '50px',
              backgroundColor: '#c0392b',
              clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
              borderTop: '3px solid #a5281b'
            }}></div>
            
            {/* Windows */}
            <div style={{
              position: 'absolute',
              top: '30px',
              left: '20px',
              width: '40px',
              height: '40px',
              backgroundColor: '#3498db',
              border: '2px solid #2980b9',
              display: 'flex',
              flexWrap: 'wrap'
            }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{
                  width: '50%',
                  height: '50%',
                  border: '1px solid #2980b9'
                }}></div>
              ))}
            </div>
            
            <div style={{
              position: 'absolute',
              top: '30px',
              right: '20px',
              width: '40px',
              height: '40px',
              backgroundColor: '#3498db',
              border: '2px solid #2980b9',
              display: 'flex',
              flexWrap: 'wrap'
            }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{
                  width: '50%',
                  height: '50%',
                  border: '1px solid #2980b9'
                }}></div>
              ))}
            </div>
            
            {/* Door */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '60px',
              backgroundColor: '#8b4513',
              border: '2px solid #5d2d0f',
              borderRadius: '5px 5px 0 0'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '5px',
                width: '6px',
                height: '6px',
                backgroundColor: '#f1c40f',
                borderRadius: '50%'
              }}></div>
            </div>
          </div>
          
          {/* Construction Crane */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '-60px',
            width: '10px',
            height: '200px',
            backgroundColor: '#7f8c8d',
            zIndex: 2
          }}>
            {/* Crane Arm */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '0',
              width: '120px',
              height: '10px',
              backgroundColor: '#7f8c8d',
              animation: 'craneArm 8s infinite'
            }}>
              {/* Crane Hook */}
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                right: '30px',
                width: '5px',
                height: '30px',
                backgroundColor: '#34495e',
                animation: 'craneHook 8s infinite'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '-7.5px',
                  width: '20px',
                  height: '10px',
                  backgroundColor: '#e74c3c',
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)'
                }}></div>
              </div>
            </div>
          </div>
          
          {/* Construction Worker */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            right: '10px',
            width: '30px',
            height: '50px',
            animation: 'workerWalk 12s infinite'
          }}>
            {/* Head */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '5px',
              width: '20px',
              height: '20px',
              backgroundColor: '#f1c40f',
              borderRadius: '50%',
              border: '2px solid #d35400'
            }}></div>
            
            {/* Body */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '10px',
              width: '10px',
              height: '25px',
              backgroundColor: '#3498db'
            }}></div>
          </div>
        </div>
      </div>
      
      {/* Login Form */}
      <div className="card p-4" style={{ 
        width: '100%', 
        maxWidth: '500px',
        borderRadius: '15px',
        background: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        zIndex: 1,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <h1 className="fw-bold mb-1" style={{ 
              color: '#2c3e50',
              fontSize: '2.5rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <i className="bi bi-building" style={{ marginRight: '10px' }}></i>
             SJS CONSTRUCTION
            </h1>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>
              Construction Management System
            </p>
            
            <h2 className="fw-bold mt-4" style={{ 
              color: '#e67e22',
              position: 'relative',
              display: 'inline-block',
              paddingBottom: '10px'
            }}>
              Login to Your Account
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: 'linear-gradient(to right, #3498db, #2c3e50)',
                borderRadius: '2px'
              }}></div>
            </h2>
          </div>

          {error && (
            <div className="alert alert-danger py-2" role="alert" style={{ borderRadius: '8px' }}>
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ color: '#2c3e50' }}>Email Address</label>
              <div className="input-group">
                <span className="input-group-text" style={{ 
                  background: '#f8f9fa', 
                  border: '1px solid #ced4da',
                  borderRight: 'none',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px'
                }}>
                  <i className="bi bi-envelope text-primary"></i>
                </span>
                <input 
                  type="email" 
                  name="email" 
                  className="form-control py-2" 
                  placeholder="Enter your email" 
                  onChange={handleChange} 
                  required 
                  style={{ 
                    borderRadius: '0 8px 8px 0',
                    border: '1px solid #ced4da',
                    borderLeft: 'none',
                    background: '#fff'
                  }}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ color: '#2c3e50' }}>Password</label>
              <div className="input-group">
                <span className="input-group-text" style={{ 
                  background: '#f8f9fa', 
                  border: '1px solid #ced4da',
                  borderRight: 'none',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px'
                }}>
                  <i className="bi bi-lock text-primary"></i>
                </span>
                <input 
                  type="password" 
                  name="password" 
                  className="form-control py-2" 
                  placeholder="Enter your password" 
                  onChange={handleChange} 
                  required 
                  style={{ 
                    borderRadius: '0 8px 8px 0',
                    border: '1px solid #ced4da',
                    borderLeft: 'none',
                    background: '#fff'
                  }}
                />
              </div>
            </div>
            
            <div className="d-flex justify-content-end mb-4">
              <a href="#" className="text-decoration-none" style={{ color: '#3498db', fontSize: '0.9rem' }}>
                Forgot Password?
              </a>
            </div>
            
            <button 
              type="submit" 
              className="btn w-100 py-3 fw-bold text-white d-flex align-items-center justify-content-center" 
              disabled={isLoading}
              style={{ 
                borderRadius: '8px',
                background: 'linear-gradient(to right, #e67e22, #d35400)',
                border: 'none',
                transition: 'all 0.3s',
                boxShadow: '0 4px 10px rgba(230, 126, 34, 0.4)'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Authenticating...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
          
          <div className="mt-4 text-center pt-3 border-top">
            <p className="text-muted mb-0 ">
              Don't have an account? 
              <Link to="/register" className="ms-1 fw-semibold" style={{ color: '#3498db', textDecoration: 'none' }}>
                Register Now
              </Link>
            </p>
           
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translate(-50%, -50%) translateY(0px); }
            50% { transform: translate(-50%, -50%) translateY(-15px); }
            100% { transform: translate(-50%, -50%) translateY(0px); }
          }
          
          @keyframes craneArm {
            0% { transform: rotate(0deg); transform-origin: right center; }
            25% { transform: rotate(20deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(-15deg); }
            100% { transform: rotate(0deg); }
          }
          
          @keyframes craneHook {
            0% { transform: translateY(0); }
            25% { transform: translateY(40px); }
            50% { transform: translateY(0); }
            75% { transform: translateY(20px); }
            100% { transform: translateY(0); }
          }
          
          @keyframes workerWalk {
            0% { transform: translateX(0); }
            25% { transform: translateX(-100px); }
            50% { transform: translateX(-100px) translateY(-20px); }
            75% { transform: translateX(0) translateY(-20px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}

export default Login;
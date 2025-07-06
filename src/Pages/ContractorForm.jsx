import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaClipboardList, FaUser, FaPlus, FaSignOutAlt, FaImage, FaHardHat, FaCheck, FaTimes, FaDownload, FaPrint } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContractorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contractorWorks, setContractorWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    previousWorks: '',
    cost: '',
    time: '',
    images: [],
    billItems: [{ 
      id: Date.now(), 
      name: '', 
      brand: '',
      quantity: 1, 
      price: 0,
      category: 'Material'
    }]
  });
  
  // Color scheme
  const colors = {
    primary: '#2C3E50',         
    secondary: '#3498DB',     
    accent: '#E74C3C',         
    success: '#27AE60',       
    warning: '#F39C12',       
    info: '#2980B9',           
    light: '#ECF0F1',          
    dark: '#2C3E50',          
    background: '#F5F7FA',     
    text: '#34495E',          
    white: '#FFFFFF',
    paleGreen: '#E8F8F5',      
    paleBlue: '#EBF5FB'       
  };

  useEffect(() => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  };

  // Bill of Materials Functions
  const addBillItem = () => {
    setFormData(prev => ({
      ...prev,
      billItems: [...prev.billItems, { 
        id: Date.now(), 
        name: '', 
        brand: '',
        quantity: 1, 
        price: 0,
        category: 'Material'
      }]
    }));
  };

  const removeBillItem = (id) => {
    setFormData(prev => ({
      ...prev,
      billItems: prev.billItems.filter(item => item.id !== id)
    }));
  };

  const handleBillItemChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      billItems: prev.billItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const calculateTotal = () => {
    return formData.billItems.reduce((total, item) => 
      total + (item.quantity * item.price), 0);
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
      totalCost: calculateTotal(),
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
      images: [],
      billItems: [{ 
        id: Date.now(), 
        name: '', 
        brand: '',
        quantity: 1, 
        price: 0,
        category: 'Material'
      }]
    });
    setShowForm(false);
    toast.success("Work submitted successfully!");
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const getStatusColor = (status) => {
    if (status === 'approved') return colors.success;
    if (status === 'rejected') return colors.accent;
    return colors.warning;
  };

  // Bill View Functions
  const handleViewBill = (work) => {
    setSelectedWork(work);
    setShowBill(true);
  };

  const handleDownloadBill = () => {
    if (!selectedWork) return;
    
    const billContent = `
      CONSTRUCTION BILL OF MATERIALS
      ==============================
      Contractor: ${selectedWork.name}
      Email: ${selectedWork.email}
      Date: ${new Date(selectedWork.requestDate).toLocaleDateString()}
      
      ITEMS:
      ${selectedWork.billItems?.map(item => `
        ${item.name} (${item.brand}) - ${item.category}
        Quantity: ${item.quantity} 
        Price: ₹${item.price.toFixed(2)}
        Total: ₹${(item.quantity * item.price).toFixed(2)}
      `).join('\n')}
      
      ==============================
      GRAND TOTAL: ₹${selectedWork.totalCost?.toFixed(2)}
    `;
    
    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedWork.name}-bill.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const navigateToContractorDetails = (id) => {
    // Implementation for navigation to details
  };

  const renderContent = () => {
    if (showForm) {
      return (
        <div style={{
          backgroundColor: colors.white,
          borderRadius: '10px',
          padding: '25px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          border: `1px solid ${colors.light}`
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: '600',
            color: colors.primary,
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
                color: colors.text,
                fontSize: '0.9rem',
                fontWeight: '500'
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
                  border: `1px solid ${colors.light}`,
                  backgroundColor: colors.white,
                  color: colors.text,
                  fontSize: '0.9rem'
                }}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                color: colors.text,
                fontSize: '0.9rem',
                fontWeight: '500'
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
                  border: `1px solid ${colors.light}`,
                  backgroundColor: colors.white,
                  color: colors.text,
                  fontSize: '0.9rem'
                }}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                color: colors.text,
                fontSize: '0.9rem',
                fontWeight: '500'
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
                  border: `1px solid ${colors.light}`,
                  backgroundColor: colors.white,
                  color: colors.text,
                  fontSize: '0.9rem',
                  minHeight: '100px'
                }}
                required
                placeholder="Describe your previous construction projects"
              />
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  color: colors.text,
                  fontSize: '0.9rem',
                  fontWeight: '500'
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
                    border: `1px solid ${colors.light}`,
                    backgroundColor: colors.white,
                    color: colors.text,
                    fontSize: '0.9rem'
                  }}
                  required
                  placeholder="Enter cost per square foot"
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  color: colors.text,
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  Estimated Time (months) *
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
                    border: `1px solid ${colors.light}`,
                    backgroundColor: colors.white,
                    color: colors.text,
                    fontSize: '0.9rem'
                  }}
                  required
                  placeholder="Enter estimated months"
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                color: colors.text,
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                Upload Work Images (Max 5)
              </label>
              <div style={{
                border: `1px dashed ${colors.light}`,
                borderRadius: '6px',
                padding: '20px',
                textAlign: 'center',
                backgroundColor: colors.paleBlue,
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
                    color: colors.text
                  }}
                >
                  <FaImage style={{ fontSize: '24px', marginBottom: '10px', color: colors.info }} />
                  <span>Click to upload images</span>
                  <span style={{ fontSize: '0.75rem', marginTop: '5px', color: colors.text, opacity: 0.7 }}>
                    JPEG, PNG (Max 5MB each)
                  </span>
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
                          backgroundColor: colors.accent,
                          color: colors.white,
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
           
            {/* Bill of Materials Section */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                color: colors.text,
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                Bill of Materials
              </label>
              
              {formData.billItems.map((item) => (
                <div key={item.id} style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 0.5fr',
                  gap: '10px', 
                  marginBottom: '10px',
                  alignItems: 'center'
                }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Product Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Cement"
                      value={item.name}
                      onChange={(e) => handleBillItemChange(item.id, 'name', e.target.value)}
                      style={{ 
                        width: '100%',
                        padding: '8px', 
                        borderRadius: '4px', 
                        border: `1px solid ${colors.light}`,
                        fontSize: '0.9rem'
                      }}
                      required
                    />
                  </div>
                  
                  <div>
                    <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Brand</label>
                    <input
                      type="text"
                      placeholder="e.g., Ultratech"
                      value={item.brand}
                      onChange={(e) => handleBillItemChange(item.id, 'brand', e.target.value)}
                      style={{ 
                        width: '100%',
                        padding: '8px', 
                        borderRadius: '4px', 
                        border: `1px solid ${colors.light}`,
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Category</label>
                    <select
                      value={item.category}
                      onChange={(e) => handleBillItemChange(item.id, 'category', e.target.value)}
                      style={{ 
                        width: '100%',
                        padding: '8px', 
                        borderRadius: '4px', 
                        border: `1px solid ${colors.light}`,
                        fontSize: '0.9rem',
                        backgroundColor: colors.white
                      }}
                    >
                      <option value="Material">Material</option>
                      <option value="Labor">Labor</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Qty</label>
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleBillItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        min="1"
                        style={{ 
                          width: '100%',
                          padding: '8px', 
                          borderRadius: '4px', 
                          border: `1px solid ${colors.light}`,
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Price (₹)</label>
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => handleBillItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        style={{ 
                          width: '100%',
                          padding: '8px', 
                          borderRadius: '4px', 
                          border: `1px solid ${colors.light}`,
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeBillItem(item.id)}
                    style={{ 
                      backgroundColor: colors.accent, 
                      color: colors.white, 
                      border: 'none', 
                      borderRadius: '4px', 
                      width: '30px', 
                      height: '30px',
                      cursor: 'pointer',
                      alignSelf: 'flex-end',
                      marginBottom: '20px'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addBillItem}
                style={{
                  backgroundColor: colors.info,
                  color: colors.white,
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  marginTop: '10px'
                }}
              >
                <FaPlus /> Add Item
              </button>
              
              <div style={{ 
                marginTop: '10px', 
                fontWeight: '600',
                padding: '10px',
                backgroundColor: colors.paleGreen,
                borderRadius: '6px',
                textAlign: 'right'
              }}>
                Total: ₹{calculateTotal().toFixed(2)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '6px',
                  backgroundColor: colors.secondary,
                  border: 'none',
                  color: colors.white,
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    backgroundColor: '#2980B9',
                    transform: 'translateY(-2px)'
                  }
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
                  backgroundColor: colors.light,
                  border: `1px solid ${colors.light}`,
                  color: colors.text,
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    backgroundColor: '#D5DBDB',
                    transform: 'translateY(-2px)'
                  }
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
          <div>
            <div style={{
              backgroundColor: colors.white,
              borderRadius: '10px',
              padding: '25px',
              marginBottom: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              border: `1px solid ${colors.light}`
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: colors.primary,
                marginTop: '0',
                marginBottom: '15px'
              }}>Welcome to Contractor Dashboard</h3>
              <p style={{
                color: colors.text,
                fontSize: '0.95rem',
                lineHeight: '1.6',
                opacity: 0.8
              }}>
                Manage your work submissions and track their status. Use the sidebar to navigate between different sections.
              </p>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '6px',
                  backgroundColor: colors.secondary,
                  border: 'none',
                  color: colors.white,
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '15px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  ':hover': {
                    backgroundColor: '#2980B9',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <FaPlus /> Submit Work
              </button>
            </div>

            <div style={{
              backgroundColor: colors.white,
              borderRadius: '10px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              border: `1px solid ${colors.light}`
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: colors.primary,
                marginTop: '0',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>Recent Submissions</span>
                <span style={{
                  fontSize: '0.8rem',
                  backgroundColor: colors.paleBlue,
                  color: colors.info,
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontWeight: '500'
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
                    border: `3px solid ${colors.light}`,
                    borderTop: `3px solid ${colors.secondary}`,
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                </div>
              ) : contractorWorks.length === 0 ? (
                <div style={{
                  padding: '30px 0',
                  textAlign: 'center',
                  color: colors.text,
                  opacity: 0.7
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
                        backgroundColor: colors.white,
                        borderRadius: '8px',
                        padding: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: `1px solid ${colors.light}`,
                        transition: 'transform 0.2s, box-shadow 0.2s'
                      }}
                    >
                      <div>
                        <h5 style={{ 
                          margin: '0 0 5px', 
                          color: colors.primary,
                          fontSize: '1rem',
                          fontWeight: '600'
                        }}>
                          {work.name}
                        </h5>
                        <p style={{ 
                          margin: '0', 
                          fontSize: '0.85rem',
                          color: colors.text,
                          opacity: 0.7
                        }}>
                          ₹{work.cost}/sq.ft • {work.time} months
                        </p>
                      </div>
                      <div>
                        <span style={{
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          backgroundColor: getStatusColor(work.status) + '20',
                          color: getStatusColor(work.status),
                          border: `1px solid ${getStatusColor(work.status)}30`
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
          <div>
            <div style={{
              backgroundColor: colors.white,
              borderRadius: '10px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              border: `1px solid ${colors.light}`,
              marginBottom: '25px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: colors.primary,
                  margin: '0'
                }}>
                  My Submissions
                </h3>
                <button
                  onClick={() => setShowForm(true)}
                  style={{
                    padding: '10px 15px',
                    borderRadius: '6px',
                    backgroundColor: colors.secondary,
                    border: 'none',
                    color: colors.white,
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    ':hover': {
                      backgroundColor: '#2980B9',
                      transform: 'translateY(-2px)'
                    }
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
                    border: `3px solid ${colors.light}`,
                    borderTop: `3px solid ${colors.secondary}`,
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                </div>
              ) : contractorWorks.length === 0 ? (
                <div style={{
                  padding: '30px 0',
                  textAlign: 'center',
                  color: colors.text,
                  opacity: 0.7
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
                        backgroundColor: colors.white,
                        borderRadius: '8px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        border: `1px solid ${colors.light}`,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'pointer',
                        ':hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                        }
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
                            color: colors.primary,
                            fontSize: '1.1rem',
                            fontWeight: '600'
                          }}>
                            {work.name}
                          </h4>
                          <p style={{ 
                            margin: '0', 
                            fontSize: '0.85rem',
                            color: colors.text,
                            opacity: 0.7
                          }}>
                            {work.email}
                          </p>
                        </div>
                        <span style={{
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          backgroundColor: getStatusColor(work.status) + '20',
                          color: getStatusColor(work.status),
                          border: `1px solid ${getStatusColor(work.status)}30`
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
                        borderTop: `1px solid ${colors.light}`,
                        paddingTop: '15px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ 
                            fontSize: '0.8rem', 
                            color: colors.text, 
                            opacity: 0.7,
                            display: 'block',
                            marginBottom: '5px'
                          }}>Cost per sq.ft</label>
                          <p style={{ 
                            margin: '0', 
                            color: colors.info,
                            fontWeight: '600'
                          }}>₹{work.cost}</p>
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ 
                            fontSize: '0.8rem', 
                            color: colors.text, 
                            opacity: 0.7,
                            display: 'block',
                            marginBottom: '5px'
                          }}>Estimated Time</label>
                          <p style={{ 
                            margin: '0', 
                            color: colors.info,
                            fontWeight: '600'
                          }}>{work.time} months</p>
                        </div>
                      </div>
                      
                      {/* Bill of Materials Button */}
                      {work.billItems && work.billItems.length > 0 && (
                        <div style={{ marginTop: '10px' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewBill(work);
                            }}
                            style={{
                              backgroundColor: colors.info,
                              color: colors.white,
                              border: 'none',
                              padding: '8px 15px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              width: '100%',
                              justifyContent: 'center'
                            }}
                          >
                            <FaDownload /> View Bill of Materials
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div>
            <div style={{
              backgroundColor: colors.white,
              borderRadius: '10px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              border: `1px solid ${colors.light}`
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: colors.primary,
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
                  backgroundColor: colors.paleBlue,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '15px',
                  border: `1px solid ${colors.info}30`,
                  fontSize: '40px',
                  color: colors.info
                }}>
                  {contractorWorks.length > 0 ? contractorWorks[0].name.charAt(0).toUpperCase() : 'C'}
                </div>
                <h4 style={{
                  margin: '0 0 5px',
                  color: colors.primary,
                  fontSize: '1.2rem',
                  fontWeight: '600'
                }}>
                  {contractorWorks.length > 0 ? contractorWorks[0].name : 'Contractor Name'}
                </h4>
                <p style={{
                  margin: '0',
                  color: colors.text,
                  opacity: 0.7,
                  fontSize: '0.9rem'
                }}>
                  {contractorWorks.length > 0 ? contractorWorks[0].email : 'contractor@example.com'}
                </p>
              </div>
              
              <div style={{
                backgroundColor: colors.paleBlue,
                borderRadius: '8px',
                border: `1px solid ${colors.light}`,
                overflow: 'hidden',
                marginBottom: '25px'
              }}>
                <div style={{
                  padding: '15px',
                  borderBottom: `1px solid ${colors.light}`
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <label style={{ 
                        fontSize: '0.8rem', 
                        color: colors.text,
                        opacity: 0.7,
                        display: 'block',
                        marginBottom: '5px'
                      }}>Total Submissions</label>
                      <p style={{ 
                        margin: '0', 
                        color: colors.primary,
                        fontWeight: '600',
                        fontSize: '1rem'
                      }}>{contractorWorks.length}</p>
                    </div>
                    <div>
                      <label style={{ 
                        fontSize: '0.8rem', 
                        color: colors.text,
                        opacity: 0.7,
                        display: 'block',
                        marginBottom: '5px'
                      }}>Approved</label>
                      <p style={{ 
                        margin: '0', 
                        color: colors.success,
                        fontWeight: '600',
                        fontSize: '1rem'
                      }}>{contractorWorks.filter(work => work.status === 'approved').length}</p>
                    </div>
                    <div>
                      <label style={{ 
                        fontSize: '0.8rem', 
                        color: colors.text,
                        opacity: 0.7,
                        display: 'block',
                        marginBottom: '5px'
                      }}>Pending</label>
                      <p style={{ 
                        margin: '0', 
                        color: colors.warning,
                        fontWeight: '600',
                        fontSize: '1rem'
                      }}>
                        {contractorWorks.filter(work => !work.status || work.status === 'pending').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div style={{ padding: '15px' }}>
                  <label style={{ 
                    fontSize: '0.8rem', 
                    color: colors.text,
                    opacity: 0.7,
                    display: 'block',
                    marginBottom: '5px'
                  }}>Average Cost per sq.ft</label>
                  <p style={{ 
                    margin: '0', 
                    color: colors.info,
                    fontWeight: '600',
                    fontSize: '1rem'
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
                  borderRadius: '6px', 
                  backgroundColor: colors.secondary,
                  border: 'none',
                  color: colors.white,
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  ':hover': {
                    backgroundColor: '#2980B9',
                    transform: 'translateY(-2px)'
                  }
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
        boxShadow: '2px 0 15px rgba(0,0,0,0.1)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo/Title Area */}
        <div style={{
          padding: '20px',
          textAlign: 'center',
          borderBottom: `1px solid rgba(255,255,255,0.1)`,
          marginBottom: '20px'
        }}>
          <h2 style={{ 
            color: colors.white, 
            margin: '0',
            fontSize: '1.5rem',
            fontWeight: '600'
          }}>
            Contractor Portal
          </h2>
          <p style={{ 
            color: colors.paleBlue, 
            fontSize: '0.85rem', 
            marginTop: '5px',
            opacity: 0.8
          }}>
            Manage Your Projects
          </p>
        </div>

        {/* Logout Button - Moved up */}
        <div style={{ 
          padding: '20px',
          borderBottom: `1px solid rgba(255,255,255,0.1)`,
          marginBottom: '20px'
        }}>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: 'transparent',
              color: colors.white,
              border: `1px solid ${colors.accent}`,
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              ':hover': {
                backgroundColor: 'rgba(231, 76, 60, 0.1)'
              }
            }}
          >
            <FaSignOutAlt style={{ fontSize: '1.1rem' }} /> Logout
          </button>
        </div>

        {/* Navigation Links */}
        <div style={{ padding: '0 20px' }}>
          <NavItem 
            icon={<FaHome style={{ fontSize: '1.1rem' }} />} 
            text="Dashboard" 
            active={activeTab === 'dashboard' && !showForm} 
            onClick={() => {
              setActiveTab('dashboard');
              setShowForm(false);
            }}
            colors={colors}
          />
          
          <NavItem 
            icon={<FaClipboardList style={{ fontSize: '1.1rem' }} />} 
            text="My Submissions" 
            active={activeTab === 'submissions' && !showForm} 
            onClick={() => {
              setActiveTab('submissions');
              setShowForm(false);
            }}
            colors={colors}
          />
          
          <NavItem 
            icon={<FaPlus style={{ fontSize: '1.1rem' }} />} 
            text="New Submission" 
            active={showForm} 
            onClick={() => setShowForm(true)}
            colors={colors}
          />
          
          <NavItem 
            icon={<FaUser style={{ fontSize: '1.1rem' }} />} 
            text="My Profile" 
            active={activeTab === 'profile' && !showForm} 
            onClick={() => {
              setActiveTab('profile');
              setShowForm(false);
            }}
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
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          borderLeft: `5px solid ${colors.secondary}`
        }}>
          <h1 style={{ 
            margin: '0',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: colors.primary
          }}>
            {showForm ? 'Submit New Work' : 
             activeTab === 'dashboard' ? 'Contractor Dashboard' : 
             activeTab === 'submissions' ? 'My Submissions' : 
             activeTab === 'profile' ? 'My Profile' : 'Dashboard'}
          </h1>
        </div>

        {/* Main Content */}
        {renderContent()}
      </div>

      {/* Bill View Modal */}
      {showBill && selectedWork && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: colors.white,
            borderRadius: '10px',
            padding: '25px',
            width: '90%',
            maxWidth: '700px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 5px 30px rgba(0,0,0,0.3)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: `1px solid ${colors.light}`,
              paddingBottom: '15px'
            }}>
              <h3 style={{ margin: 0, color: colors.primary }}>Bill of Materials</h3>
              <button 
                onClick={() => setShowBill(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  color: colors.text
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontWeight: '600' }}>{selectedWork.name}</div>
                  <div>{selectedWork.email}</div>
                </div>
                <div>
                  <div>Date: {new Date(selectedWork.requestDate).toLocaleDateString()}</div>
                  <div>Total: ₹{selectedWork.totalCost?.toFixed(2) || '0.00'}</div>
                </div>
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ backgroundColor: colors.paleBlue }}>
                    <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${colors.light}` }}>Product</th>
                    <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${colors.light}` }}>Brand</th>
                    <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${colors.light}` }}>Category</th>
                    <th style={{ padding: '10px', textAlign: 'center', border: `1px solid ${colors.light}` }}>Qty</th>
                    <th style={{ padding: '10px', textAlign: 'right', border: `1px solid ${colors.light}` }}>Price</th>
                    <th style={{ padding: '10px', textAlign: 'right', border: `1px solid ${colors.light}` }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedWork.billItems?.map((item, index) => (
                    <tr key={index}>
                      <td style={{ padding: '10px', border: `1px solid ${colors.light}` }}>{item.name}</td>
                      <td style={{ padding: '10px', border: `1px solid ${colors.light}` }}>{item.brand}</td>
                      <td style={{ padding: '10px', border: `1px solid ${colors.light}` }}>{item.category}</td>
                      <td style={{ padding: '10px', textAlign: 'center', border: `1px solid ${colors.light}` }}>{item.quantity}</td>
                      <td style={{ padding: '10px', textAlign: 'right', border: `1px solid ${colors.light}` }}>₹{item.price.toFixed(2)}</td>
                      <td style={{ padding: '10px', textAlign: 'right', border: `1px solid ${colors.light}` }}>₹{(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div style={{ 
                textAlign: 'right', 
                fontWeight: 'bold',
                fontSize: '1.1rem',
                marginTop: '15px',
                paddingTop: '10px',
                borderTop: `2px solid ${colors.primary}`
              }}>
                Grand Total: ₹{selectedWork.totalCost?.toFixed(2) || '0.00'}
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '10px',
              borderTop: `1px solid ${colors.light}`,
              paddingTop: '15px'
            }}>
              <button
                onClick={handleDownloadBill}
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <FaDownload /> Download
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  backgroundColor: colors.info,
                  color: colors.white,
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <FaPrint /> Print
              </button>
            </div>
          </div>
        </div>
      )}

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
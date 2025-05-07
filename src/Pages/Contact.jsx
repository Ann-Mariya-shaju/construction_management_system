import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  return (
    <div className="contact-page">
      {/* Hero Section with Overlay */}
      <div 
        className="contact-hero" 
        style={{ 
          backgroundImage: 'url(/src/assets/home.jpg)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          padding: '100px 0 50px'
        }}
      >
        <div 
          className="overlay" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          }}
        />
        
        <Container className="position-relative" style={{ zIndex: 1 }}>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h1 className="display-4 fw-bold text-white mb-4">Get In Touch</h1>
              <div className="divider mx-auto mb-4" style={{ height: '4px', width: '60px', backgroundColor: '#e8a012' }}></div>
              <p className="lead text-white mb-0">
                We're here to answer any questions you have about our services. Reach out to us and we'll respond as soon as we can.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Contact Form and Information */}
      <section className="py-5" style={{ backgroundColor: '#f8f5f0' }}>
        <Container>
          <Row>
            {/* Contact Information */}
            <Col lg={5} className="mb-4 mb-lg-0">
              <div className="contact-info p-4 h-100" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', borderLeft: '4px solid #e8a012' }}>
                <h2 className="h3 mb-4" style={{ color: '#3a3a3a' }}>Contact Information</h2>
                <p className="mb-4" style={{ color: '#555555', lineHeight: '1.8' }}>
                  Have questions or ready to start your next construction project? Our team is here to provide the information and guidance you need.
                </p>
                
                <div className="contact-item d-flex align-items-start mb-4">
                  <div className="icon me-3" style={{ color: '#e8a012' }}>
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <h3 className="h6 mb-1" style={{ color: '#3a3a3a' }}>Phone</h3>
                    <p className="mb-0" style={{ color: '#555555' }}>(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="contact-item d-flex align-items-start mb-4">
                  <div className="icon me-3" style={{ color: '#e8a012' }}>
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h3 className="h6 mb-1" style={{ color: '#3a3a3a' }}>Email</h3>
                    <p className="mb-0" style={{ color: '#555555' }}>info@sjsbuilders.com</p>
                  </div>
                </div>
                
                <div className="contact-item d-flex align-items-start">
                  <div className="icon me-3" style={{ color: '#e8a012' }}>
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h3 className="h6 mb-1" style={{ color: '#3a3a3a' }}>Office Location</h3>
                    <p className="mb-0" style={{ color: '#555555' }}>123 Construction Way, Building City, BC 12345</p>
                  </div>
                </div>
                
                <hr className="my-4" style={{ backgroundColor: '#eeeeee' }} />
                
                <h3 className="h5 mb-3" style={{ color: '#3a3a3a' }}>Office Hours</h3>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: '#555555' }}>Monday - Friday:</span>
                  <span style={{ color: '#3a3a3a', fontWeight: '500' }}>8:00 AM - 5:00 PM</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: '#555555' }}>Saturday:</span>
                  <span style={{ color: '#3a3a3a', fontWeight: '500' }}>9:00 AM - 2:00 PM</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span style={{ color: '#555555' }}>Sunday:</span>
                  <span style={{ color: '#3a3a3a', fontWeight: '500' }}>Closed</span>
                </div>
              </div>
            </Col>
            
            {/* Contact Form */}
            <Col lg={7}>
              <div className="contact-form p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', borderRadius: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                <h2 className="h3 mb-4" style={{ color: '#ffffff' }}>Send Us a Message</h2>
                <p className="mb-4" style={{ color: '#e6e6e6' }}>Fill out the form below and our team will get back to you as soon as possible.</p>
                
                <Form>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label style={{ color: '#ffffff', fontWeight: '500' }}>Full Name *</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Your Name" 
                          required 
                          style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: '#444444', padding: '10px 15px' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label style={{ color: '#ffffff', fontWeight: '500' }}>Email Address *</Form.Label>
                        <Form.Control 
                          type="email" 
                          placeholder="Your Email" 
                          required 
                          style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: '#444444', padding: '10px 15px' }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label style={{ color: '#ffffff', fontWeight: '500' }}>Phone Number</Form.Label>
                        <Form.Control 
                          type="tel" 
                          placeholder="Your Phone" 
                          style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: '#444444', padding: '10px 15px' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label style={{ color: '#ffffff', fontWeight: '500' }}>Project Type</Form.Label>
                        <Form.Select 
                          style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: '#444444', padding: '10px 15px', color: '#333333' }}
                        >
                          <option>Select Project Type</option>
                          <option value="Residential">Residential Construction</option>
                          <option value="Commercial">Commercial Construction</option>
                          <option value="Industrial">Industrial Construction</option>
                          <option value="Renovation">Renovation</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#ffffff', fontWeight: '500' }}>Message *</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={5} 
                      placeholder="Tell us about your project or inquiry" 
                      required 
                      style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: '#444444', padding: '15px', resize: 'none' }}
                    />
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    className="py-2 px-4" 
                    style={{ 
                      backgroundColor: '#e8a012', 
                      borderColor: '#e8a012', 
                      fontWeight: 'bold',
                      fontSize: '16px',
                      letterSpacing: '0.5px'
                    }}
                  >
                    SEND MESSAGE
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Google Map */}
      <div className="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.2!2d-74.0!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzAuMCJOIDc0wrAwMCcwLjAiVw!5e0!3m2!1sen!2sus!4v1621814396186!5m2!1sen!2sus" 
          width="100%" 
          height="400" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          title="SJS Builders Location"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
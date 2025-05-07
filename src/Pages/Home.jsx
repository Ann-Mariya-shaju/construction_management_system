import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import homeBg from "../assets/home.png";
import { FaHandshake, FaTools, FaHome, FaBuilding } from 'react-icons/fa';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section with Overlay */}
      <div 
        className="hero-section" 
        style={{ 
          backgroundImage: `url(${homeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          position: 'relative'
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
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
          }}
        />
        
        <Container className="h-100">
          <Row className="h-100 align-items-center">
            <Col md={8} className="text-white" style={{ position: 'relative', zIndex: 1 }}>
              <h1 className="display-4 fw-bold mb-4">Building Excellence, Crafting Futures</h1>
              <p className="lead mb-4">Premium construction services for residential, commercial, and industrial projects</p>
              <Button variant="warning" size="lg" className="fw-bold px-4 py-2">
                GET A FREE QUOTE
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* About Us Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f5f0' }}>
        <Container>
          <Row className="justify-content-center mb-5">
            <Col md={8} className="text-center">
              <h2 className="display-5 fw-bold mb-3" style={{ color: '#3a3a3a' }}>ABOUT US</h2>
              <div className="divider mx-auto mb-4" style={{ height: '4px', width: '60px', backgroundColor: '#e8a012' }}></div>
              <p className="lead" style={{ color: '#555555' }}>
                At SJS Builders, we are committed to delivering high-quality, reliable, and efficient construction services 
                tailored to meet the unique needs of each client.
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <p style={{ color: '#555555', lineHeight: '1.8' }}>
                With years of experience in the industry, our team combines expertise, craftsmanship, and innovation 
                to build spaces that stand the test of time. Whether it's residential, commercial, or industrial projects, 
                we take pride in every detail, ensuring that each project is completed on time and within budget.
              </p>
              <p style={{ color: '#555555', lineHeight: '1.8' }}>
                Our focus on trust, transparency, and customer satisfaction has earned us a reputation as a trusted 
                partner in the construction industry. Let us build your future, one brick at a time.
              </p>
              <Button variant="outline-warning" className="mt-3 fw-bold" style={{ borderColor: '#e8a012', color: '#3a3a3a' }}>Learn More About Us</Button>
            </Col>
            <Col md={6}>
              <div className="p-4 shadow-sm rounded" style={{ backgroundColor: '#ffffff', borderLeft: '4px solid #e8a012' }}>
                <h3 className="h5 mb-4" style={{ color: '#3a3a3a' }}>Why Choose SJS Builders?</h3>
                <div className="d-flex align-items-start mb-3">
                  <div className="me-3" style={{ color: '#e8a012' }}>
                    <FaHandshake size={24} />
                  </div>
                  <div>
                    <h4 className="h6 mb-1" style={{ color: '#3a3a3a' }}>Trust & Reliability</h4>
                    <p className="mb-0 small" style={{ color: '#555555' }}>We build relationships as strong as our structures.</p>
                  </div>
                </div>
                <div className="d-flex align-items-start mb-3">
                  <div className="me-3" style={{ color: '#e8a012' }}>
                    <FaTools size={24} />
                  </div>
                  <div>
                    <h4 className="h6 mb-1" style={{ color: '#3a3a3a' }}>Expert Craftsmanship</h4>
                    <p className="mb-0 small" style={{ color: '#555555' }}>Skilled professionals with attention to detail.</p>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <div className="me-3" style={{ color: '#e8a012' }}>
                    <FaBuilding size={24} />
                  </div>
                  <div>
                    <h4 className="h6 mb-1" style={{ color: '#3a3a3a' }}>Comprehensive Services</h4>
                    <p className="mb-0 small" style={{ color: '#555555' }}>From concept to completion, we handle it all.</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col md={8} className="text-center">
              <h2 className="display-5 fw-bold mb-3">OUR SERVICES</h2>
              <div className="divider mx-auto mb-4" style={{ height: '4px', width: '60px', backgroundColor: '#ffc107' }}></div>
              <p className="lead">Comprehensive construction solutions for all your needs</p>
            </Col>
          </Row>
          
          <Row>
            <Col md={4} className="mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-box mb-3">
                    <FaHome size={40} className="text-warning" />
                  </div>
                  <h3 className="h4 mb-3">Residential</h3>
                  <p className="mb-3">Custom homes, renovations, and additions designed to enhance your living space.</p>
                  <Button variant="link" className="text-decoration-none p-0">Learn More →</Button>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-box mb-3">
                    <FaBuilding size={40} className="text-warning" />
                  </div>
                  <h3 className="h4 mb-3">Commercial</h3>
                  <p className="mb-3">Office buildings, retail spaces, and commercial properties built to your specifications.</p>
                  <Button variant="link" className="text-decoration-none p-0">Learn More →</Button>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-box mb-3">
                    <FaTools size={40} className="text-warning" />
                  </div>
                  <h3 className="h4 mb-3">Industrial</h3>
                  <p className="mb-3">Warehouses, manufacturing facilities, and industrial complexes built to last.</p>
                  <Button variant="link" className="text-decoration-none p-0">Learn More →</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-5" style={{ backgroundColor: '#3a3a3a', color: '#ffffff' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mb-4 mb-lg-0">
              <h3 className="mb-2 fw-bold">Ready to start your construction project?</h3>
              <p className="lead mb-0" style={{ color: '#e6e6e6' }}>Contact us today for a free consultation and quote.</p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <Button variant="warning" size="lg" className="fw-bold px-4 py-2" style={{ backgroundColor: '#e8a012', borderColor: '#e8a012' }}>GET STARTED</Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;
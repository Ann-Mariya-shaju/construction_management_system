// src/Pages/Services.jsx
import React from 'react';
import { Col, Row, Card, Button } from 'react-bootstrap';
import residentialImage from '../assets/interior (1).jpg';
import interiorsImage from '../assets/interior (2).jpg';
import maintenanceImage from '../assets/maintanence.jpg';

function Services() {
  // Color scheme matching UserDashboard
  const colors = {
    primary: '#D0B8A8',    // Peach
    secondary: '#DFD3C3',  // Light beige
    accent: '#A45C40',     // Darker peach
    success: '#5C8D89',    // Muted teal
    warning: '#E4A444',    // Gold
    light: '#F8EDE3',      // Very light peach
    dark: '#6B4F4F',       // Dark brown
    background: '#F9F5F0', // Off-white with peach tint
    text: '#5E4A4A',       // Dark brown-gray
    white: '#FFFFFF',
  };

  return (
    <div
      style={{
        backgroundColor: colors.background,
        minHeight: '100vh',
        padding: '3rem 1rem',
      }}
    >
      <div className="container">
        <h2
          className="text-center mb-5 fw-bold"
          style={{
            color: colors.dark,
            fontSize: '2.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: `2px solid ${colors.primary}`,
            paddingBottom: '0.5rem',
            marginBottom: '3rem',
          }}
        >
          Our Services
        </h2>

        <Row className="g-4">
          {/* Residential Construction Card */}
          <Col xs={12} md={6} lg={4}>
            <Card
              className="h-100 border-0 shadow-sm"
              style={{
                borderRadius: '12px',
                backgroundColor: colors.white,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 3px 15px rgba(0,0,0,0.05)';
              }}
            >
              <div
                className="position-relative"
                style={{ height: '250px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}
              >
                <Card.Img
                  variant="top"
                  src={residentialImage}
                  style={{
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
                    pointerEvents: 'none',
                  }}
                ></div>
              </div>
              <Card.Body className="d-flex flex-column p-4">
                <Card.Title
                  className="fw-semibold mb-3"
                  style={{ color: colors.dark, fontSize: '1.5rem' }}
                >
                  Residential Construction
                </Card.Title>
                <Card.Text
                  className="flex-grow-1"
                  style={{ color: colors.text, opacity: 0.85, fontSize: '1rem' }}
                >
                  We specialize in building residential spaces that are both functional and aesthetically pleasing. From single-family homes to large estates, we focus on quality and attention to detail.
                </Card.Text>
                <Button
                  variant="outline-primary"
                  className="mt-auto"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    borderRadius: '8px',
                    padding: '0.5rem 1.5rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = colors.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = colors.primary;
                  }}
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Interiors Card */}
          <Col xs={12} md={6} lg={4}>
            <Card
              className="h-100 border-0 shadow-sm"
              style={{
                borderRadius: '12px',
                backgroundColor: colors.white,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 3px 15px rgba(0,0,0,0.05)';
              }}
            >
              <div
                className="position-relative"
                style={{ height: '250px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}
              >
                <Card.Img
                  variant="top"
                  src={interiorsImage}
                  style={{
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
                    pointerEvents: 'none',
                  }}
                ></div>
              </div>
              <Card.Body className="d-flex flex-column p-4">
                <Card.Title
                  className="fw-semibold mb-3"
                  style={{ color: colors.dark, fontSize: '1.5rem' }}
                >
                  Interiors
                </Card.Title>
                <Card.Text
                  className="flex-grow-1"
                  style={{ color: colors.text, opacity: 0.85, fontSize: '1rem' }}
                >
                  Our interior design team offers comprehensive design and build services for both residential and commercial spaces. We ensure that every detail matches your style and needs.
                </Card.Text>
                <Button
                  variant="outline-primary"
                  className="mt-auto"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    borderRadius: '8px',
                    padding: '0.5rem 1.5rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = colors.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = colors.primary;
                  }}
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Maintenance Card */}
          <Col xs={12} md={6} lg={4}>
            <Card
              className="h-100 border-0 shadow-sm"
              style={{
                borderRadius: '12px',
                backgroundColor: colors.white,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 3px 15px rgba(0,0,0,0.05)';
              }}
            >
              <div
                className="position-relative"
                style={{ height: '250px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}
              >
                <Card.Img
                  variant="top"
                  src={maintenanceImage}
                  style={{
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
                    pointerEvents: 'none',
                  }}
                ></div>
              </div>
              <Card.Body className="d-flex flex-column p-4">
                <Card.Title
                  className="fw-semibold mb-3"
                  style={{ color: colors.dark, fontSize: '1.5rem' }}
                >
                  Maintenance
                </Card.Title>
                <Card.Text
                  className="flex-grow-1"
                  style={{ color: colors.text, opacity: 0.85, fontSize: '1rem' }}
                >
                  We offer comprehensive maintenance services to ensure your property stays in top condition. From routine inspections to emergency repairs, our team provides reliable support for both residential and commercial buildings.
                </Card.Text>
                <Button
                  variant="outline-primary"
                  className="mt-auto"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    borderRadius: '8px',
                    padding: '0.5rem 1.5rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = colors.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = colors.primary;
                  }}
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Services;
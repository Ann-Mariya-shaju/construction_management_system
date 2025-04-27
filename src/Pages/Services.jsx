import React from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import residentialImage from '../assets/interior (1).jpg'; 
import interiorsImage from '../assets/interior (2).jpg'; 
import maintanenceImage from '../assets/maintanence.jpg';

function Services() {
  return (
    <div className="container p-5">
      <h2 className="text-center mb-4 text-warning">OUR SERVICES</h2>

      <Row className="g-4">
        {/* Residential Construction Card */}
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">

            <Card.Img variant="top" src={interiorsImage} style={{ height: '250px', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Residential Construction</Card.Title>
              <Card.Text className="flex-grow-1">
                We specialize in building residential spaces that are both functional and aesthetically pleasing. From single-family homes to large estates, we focus on quality and attention to detail.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Interiors Card */}
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={ residentialImage} style={{ height: '250px', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Interiors</Card.Title>
              <Card.Text className="flex-grow-1">
                Our interior design team offers comprehensive design and build services for both residential and commercial spaces. We ensure that every detail matches your style and needs.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>


         {/* Interiors Card */}
         <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={maintanenceImage} style={{ height: '250px', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Maintanence</Card.Title>
              <Card.Text className="flex-grow-1">
              We offer comprehensive maintenance services to ensure your property stays in top condition. From routine inspections to emergency repairs, our team provides reliable support for both residential and commercial buildings, helping extend the life of your investment.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Services;

import React from 'react';
import { Col, Row } from 'react-bootstrap';
import homeBg from "../assets/home.png"; // Import your background image

function Home() {
  return (
    <>
      <div
        id="about"
        className="container-fluid p-5"
        style={{
          width: '100%',
          minHeight: '100vh',
          backgroundImage: `url(${homeBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '15px', // Added border-radius to the container
        }}
      >
        {/* Overlay to make text more readable */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Lighter overlay for better contrast
            borderRadius: '15px', // Apply border-radius to overlay for consistency
          }}
        />

        {/* Content section */}
        <Row 
          className="d-flex justify-content-center align-items-center h-100" 
          style={{
            borderRadius: '15px', // Apply border-radius to Row as well
            overflow: 'hidden',  // Ensures no content overflows outside rounded corners
          }}
        >
          <Col
            md={8}
            lg={6}
            className="text-center p-4 rounded-4"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background for readability
              borderRadius: '10px', // Border-radius for the content box
            }}
          >
            <h3 className="text-white mb-4">ABOUT US</h3>
            <p className="text-warning mb-4">
              At SJS Builders, we are committed to delivering high-quality, reliable, and efficient construction services tailored to meet the unique needs of each client. 
              With years of experience in the industry, our team combines expertise, craftsmanship, and innovation to build spaces that stand the test of time. 
              Whether it's residential, commercial, or industrial projects, we take pride in every detail, ensuring that each project is completed on time and within budget. 
              Our focus on trust, transparency, and customer satisfaction has earned us a reputation as a trusted partner in the construction industry. 
              Let us build your future, one brick at a time.
            </p>
            <button className="btn btn-warning mt-3">
              GET STARTED <i className="fa-solid fa-arrow-right ms-2"></i>
            </button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;

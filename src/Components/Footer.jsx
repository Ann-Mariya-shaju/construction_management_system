import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center bg-primary'
        style={{ height: "260px", width: "100%" }}>
        <div className='d-flex justify-content-center align-items-evenly p-4'>
          <div className='overview ' style={{ width: "400px" }}>
            <h6><i class="fa-solid fa-house fa-bounce"></i>
              <span className='ms-4' style={{ color: "white", fontWeight: "700" }}>SJS CONSTRUCTION</span>
            </h6>
            <p style={{ color: "white", textAlign: "justify" }}>Building trust with quality work. We deliver reliable, efficient, and innovative construction solutions tailored to your needs. Let’s build a better future—together.</p>
          </div>
          <div className='links ms-3' style={{ color: "white" }}>
            <h6>LINKS</h6>
            <Link style={{ textDecoration: "none", color: "white" }} to={'/'}>Home <br /></Link>
            <Link style={{ textDecoration: "none", color: "white" }} to={'/services'}>Services <br /></Link>
            <Link style={{ textDecoration: "none", color: "white" }} to={'/contact'}>Contact <br /></Link>
            {/* <Link style={{ textDecoration: "none", color: "white" }} to={'/project'}>Project<br /></Link> */}
          </div>
          {/* <div className='guide ms-4' style={{ color: "white" }}>
            <h6>GUIDE</h6>
            REACT <br />
            REACT BOOTSTRAP <br />
            FONT AWESOME <br />
          </div> */}
          <div className='contact_us ms-4' style={{ color: "white" }}>
            <h6>CONTACT US</h6>
            <div className='d-flex'>
              <input type="text" name='' placeholder='enter your email' className='form-control' />
              <button className='btn btn-warning ms-3'>subscribe</button>
            </div>
            <div className='d-flex justify-content-evenly align-items-center mt-3'>
              <i className="fa-brands fa-instagram fa-2x"></i>
              <i className="fa-brands fa-whatsapp fa-2x"></i>
              <i className="fa-brands fa-twitter fa-2x"></i>
              <i className="fa-brands fa-reddit fa-2x"></i>
            </div>
          </div>

        </div>

      </div>
      <div className='d-flex justify-content-center align-items-center mt-3'>
      <p className='textStyle'>copy right &copy; 2025 Sjs Construction</p>
  
      </div>
    </>
  )
}

export default Footer
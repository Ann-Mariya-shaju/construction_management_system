import React from 'react';

function Contact() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh', backgroundImage: 'url(/src/assets/home.jpg)', backgroundSize: 'cover' }}>
      <div className="bg-white p-4 rounded shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="mb-4 text-dark">Contact Us</h2>
        <p className='text-dark'>If you have any questions or inquiries, feel free to reach out to us!</p>

        <form className="mt-4">
          <div className="mb-3">
            <label className="form-label text-dark">Name</label>
            <input type="text" className="form-control" placeholder="Your Name" required />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Email</label>
            <input type="email" className="form-control" placeholder="Your Email" required />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Message</label>
            <textarea className="form-control" rows="4" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>

      
    </div>
  );
}

export default Contact;

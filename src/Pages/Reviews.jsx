import React, { useState } from 'react';

function Reviews() {
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Review Submitted!');
  };

  return (
    <div className="container mt-4">
      <h2>Add Review</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow" style={{ maxWidth: '500px', margin: 'auto' }}>
        <textarea 
          placeholder="Write your review..." 
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="form-control mb-3"
          required
        />
        <button type="submit" className="btn btn-primary w-100">Submit Review</button>
      </form>
    </div>
  );
}

export default Reviews;

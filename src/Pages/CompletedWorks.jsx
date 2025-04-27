import React from 'react';
import { Link } from 'react-router-dom';

function CompletedWorks() {
  const dummyWorks = [
    { id: 1, title: 'Residential Building', description: 'Completed in 6 months', image: '/src/assets/work1.jpg' },
    { id: 2, title: 'Office Complex', description: 'Completed in 8 months', image: '/src/assets/work2.jpg' }
  ];

  return (
    <div className="container mt-4">
      <h2>Completed Works</h2>
      <div className="row">
        {dummyWorks.map(work => (
          <div key={work.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={work.image} alt={work.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{work.title}</h5>
                <p className="card-text">{work.description}</p>
                <Link to="/reviews" className="btn btn-primary">Add Review</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedWorks;

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => (
  <div className="homepage-container">
    <h1>Welcome to the Secure Patient Intake System</h1>
    <p>Please login or sign up to continue.</p>
    <div className="homepage-links">
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  </div>
);

export default HomePage; 
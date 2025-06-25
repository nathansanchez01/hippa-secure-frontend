import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => (
    <div className="homepage-container">
        {/* Hero Section */}
        <section className="hero-section">
            <h1 className="hero-title">Secure Patient Intake System</h1>
            <p className="hero-subtitle">Empowering clinics to manage patient records securely and efficiently.</p>
            <Link to="/login" className="hero-cta">Get Started</Link>
        </section>

        {/* Features Section */}
        <section className="features-section">
            <h2>Why Choose Our System?</h2>
            <ul className="features-list">
                <li><strong>Role-Based Access:</strong> Admins and clinicians see only what they need.</li>
                <li><strong>HIPAA-Ready:</strong> Sensitive data like SSN is masked and protected.</li>
                <li><strong>Audit Logging:</strong> Every action is tracked for full accountability.</li>
                <li><strong>Modern & Responsive:</strong> Works beautifully on any device.</li>
                <li><strong>Fast Onboarding:</strong> Simple signup and login for your staff.</li>
            </ul>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
            <p>Ready to streamline your clinic's patient intake process?</p>
            <Link to="/signup" className="hero-cta">Create an Account</Link>
        </section>
    </div>
);

export default HomePage; 
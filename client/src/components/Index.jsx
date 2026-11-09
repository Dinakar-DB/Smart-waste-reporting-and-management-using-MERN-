import React from 'react';
import { Link } from 'react-router-dom';
import logo from './img/core-img/logo-small.png';
import heroImage from './img/bg-img/gar.jpg';

const portals = [
  { to: '/user_login', name: 'Resident', label: 'Submit and track service requests', icon: '♙', tone: 'resident' },
  { to: '/driver_login', name: 'Driver', label: 'View your assigned route and work', icon: '↗', tone: 'driver' },
  { to: '/admin_login', name: 'Administrator', label: 'Manage city collection operations', icon: '▦', tone: 'admin' },
];

export default function Index() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <Link className="app-brand" to="/"><img src={logo} alt="" /><span><strong>GreenRoute</strong><small>Waste services</small></span></Link>
        <span className="landing-header__note"><i /> Community collection portal</span>
      </header>
      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero__copy">
            <span className="landing-kicker"><i /> CLEANER STREETS START HERE</span>
            <h1>Better waste<br /><em>management</em><br />for every neighborhood.</h1>
            <p>One simple place to report collection issues, coordinate local routes, and keep your community moving.</p>
            <a className="landing-scroll" href="#portals"><span>↓</span> Choose your portal</a>
          </div>
          <div className="landing-hero__visual">
            <img src={heroImage} alt="A greener neighborhood with organized waste collection" />
            <div className="visual-badge"><span>♻</span><div><strong>Cleaner, together</strong><small>Local action makes a difference</small></div></div>
            <span className="visual-orbit visual-orbit--one" /><span className="visual-orbit visual-orbit--two" />
          </div>
        </section>
        <section className="portal-section" id="portals">
          <div className="portal-section__heading"><div><span>GET STARTED</span><h2>Choose your workspace</h2></div><p>Sign in to access the tools for your role.</p></div>
          <div className="portal-grid">
            {portals.map((portal) => <Link className={`portal-card portal-card--${portal.tone}`} key={portal.to} to={portal.to}>
              <span className="portal-card__icon">{portal.icon}</span><span className="portal-card__body"><strong>{portal.name}</strong><small>{portal.label}</small></span><span className="portal-card__arrow">↗</span>
            </Link>)}
          </div>
        </section>
      </main>
      <footer className="landing-footer"><span>GreenRoute Waste Services</span><span>Supporting cleaner, healthier communities.</span></footer>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logout from './Logout.jsx';
import logo from './img/core-img/logo-small.png';

const navigation = {
  admin: [
    { label: 'Overview', to: '/admin_home', icon: '⌂' },
    { label: 'Bins', to: '/view_bin_admin', icon: '♻' },
    { label: 'Drivers', to: '/view_driver', icon: '↗' },
    { label: 'Complaints', to: '/view_complaints_admin', icon: '◌' },
    { label: 'Work reports', to: '/view_work_report', icon: '▤' },
    { label: 'Residents', to: '/view_user_admin', icon: '◎' },
  ],
  user: [
    { label: 'Overview', to: '/user_home', icon: '⌂' },
    { label: 'New complaint', to: '/view_bin_user', icon: '＋' },
    { label: 'My complaints', to: '/view_complaints_user', icon: '◌' },
    { label: 'My profile', to: '/user_profile', icon: '◎' },
  ],
  driver: [
    { label: 'Overview', to: '/driver_home', icon: '⌂' },
    { label: 'Assigned routes', to: '/view_bin_driver', icon: '↗' },
  ],
};

const roleTitles = { admin: 'Administrator', user: 'Resident', driver: 'Driver' };

export default function DashboardShell({ role, eyebrow, title, description, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = navigation[role] || navigation.user;

  return (
    <div className={`app-shell app-shell--${role}`}>
      <aside className={`app-sidebar ${menuOpen ? 'app-sidebar--open' : ''}`}>
        <Link className="app-brand" to={`/${role}_home`} onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="" />
          <span><strong>GreenRoute</strong><small>Waste services</small></span>
        </Link>
        <div className="sidebar-caption">WORKSPACE</div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {links.map((item) => (
            <NavLink key={item.to} end className={({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}`} to={item.to} onClick={() => setMenuOpen(false)}>
              <span className="sidebar-link__icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {item.label === 'Complaints' && <span className="sidebar-link__dot" aria-hidden="true" />}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-help"><span className="help-icon">i</span><strong>Keep your area clean</strong><span>Every report helps your community.</span></div>
          <div className="sidebar-role"><span className="avatar avatar--small">{roleTitles[role]?.slice(0, 1)}</span><span><strong>{roleTitles[role]}</strong><small>Signed in</small></span></div>
          <div className="sidebar-logout"><Logout /></div>
        </div>
      </aside>

      {menuOpen && <button className="sidebar-scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
      <div className="app-main">
        <header className="app-topbar">
          <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
          <div className="topbar-breadcrumb"><span>Workspace</span><b>/</b><strong>{roleTitles[role]}</strong></div>
          <div className="topbar-right"><span className="system-status"><i /> Service portal</span><span className="avatar">{roleTitles[role]?.slice(0, 1)}</span></div>
        </header>
        <main className="app-content">
          <div className="page-heading">
            <div><span className="page-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
            <span className="page-date">♧ &nbsp; Cleaner neighborhoods, together</span>
          </div>
          {children}
        </main>
        <footer className="app-footer"><span>GreenRoute Waste Services</span><span>Small actions. Cleaner streets.</span></footer>
      </div>
    </div>
  );
}

export function ActionCard({ to, icon, category, title, description, action = 'Open' }) {
  return (
    <Link to={to} className="action-card">
      <span className="action-card__icon" aria-hidden="true">{icon}</span>
      <span className="action-card__body"><span className="action-card__category">{category}</span><strong>{title}</strong><span className="action-card__description">{description}</span></span>
      <span className="action-card__action">{action}<b aria-hidden="true">↗</b></span>
    </Link>
  );
}

export function WelcomePanel({ role, label, title, description }) {
  return (
    <section className={`welcome-panel welcome-panel--${role}`}>
      <div className="welcome-panel__copy"><span>{label}</span><h2>{title}</h2><p>{description}</p></div>
      <div className="welcome-panel__art" aria-hidden="true"><span className="art-sun" /><span className="art-leaf art-leaf--one">♧</span><span className="art-leaf art-leaf--two">♧</span><span className="art-ground" /><span className="art-bin">♻</span></div>
    </section>
  );
}

import React from 'react';
import DashboardShell, { ActionCard, WelcomePanel } from './DashboardShell.jsx';

export default function UserHome() {
  return (
    <DashboardShell role="user" eyebrow="RESIDENT SERVICES" title="Your neighborhood, a little cleaner." description="Report a collection issue, follow your requests, and keep your account up to date.">
      <WelcomePanel role="user" label="Welcome to GreenRoute" title="See something that needs attention?" description="Choose a nearby collection point and tell us what needs to be taken care of. We’ll keep your request together in one place." />
      <div className="section-title"><div><span>YOUR SERVICES</span><h2>What would you like to do?</h2></div></div>
      <div className="action-grid action-grid--resident">
        <ActionCard to="/view_bin_user" icon="＋" category="Make a report" title="New complaint" description="Find a bin and report an overflowing or missed collection." action="Start report" />
        <ActionCard to="/view_complaints_user" icon="◌" category="Stay informed" title="My complaints" description="Check the status of requests you have already submitted." action="View status" />
        <ActionCard to="/user_profile" icon="♙" category="Your account" title="My profile" description="Review your contact details and account information." action="View profile" />
      </div>
      <div className="info-strip"><span className="info-strip__icon">i</span><p><strong>Help us respond faster.</strong> Include a clear description and choose the collection point nearest to the issue.</p></div>
    </DashboardShell>
  );
}

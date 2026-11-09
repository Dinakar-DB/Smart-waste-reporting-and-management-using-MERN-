import React from 'react';
import DashboardShell, { ActionCard, WelcomePanel } from './DashboardShell.jsx';

export default function DriverHome() {
  return (
    <DashboardShell role="driver" eyebrow="FIELD OPERATIONS" title="Your route, all in one place." description="Review assigned collection points and record your latest work update.">
      <WelcomePanel role="driver" label="Driver workspace" title="Ready for today’s collection?" description="Open your assigned route to view collection details, update a bin’s GPS location, and submit a work report." />
      <div className="section-title"><div><span>ON THE ROUTE</span><h2>Driver tools</h2></div></div>
      <div className="action-grid action-grid--driver">
        <ActionCard to="/view_bin_driver" icon="↗" category="Assigned work" title="My route & bins" description="View assigned collection points and update their location." action="Open route" />
        <ActionCard to="/view_bin_driver" icon="▤" category="Work reporting" title="Submit work update" description="Record progress for a collection point on your route." action="Start update" />
      </div>
      <div className="info-strip"><span className="info-strip__icon">i</span><p><strong>Keep route information current.</strong> Use the GPS update action at a collection point to share its latest location.</p></div>
    </DashboardShell>
  );
}

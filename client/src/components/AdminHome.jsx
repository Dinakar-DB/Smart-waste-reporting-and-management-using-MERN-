import React from 'react';
import DashboardShell, { ActionCard, WelcomePanel } from './DashboardShell.jsx';

const actions = [
  { to: '/create_bin', icon: '♻', category: 'Collection network', title: 'Create a bin', description: 'Add a collection point and assign a driver.', action: 'Add bin' },
  { to: '/view_bin_admin', icon: '⌖', category: 'Collection network', title: 'Manage bins', description: 'Update collection details and map locations.', action: 'View bins' },
  { to: '/post_driver', icon: '↗', category: 'Team', title: 'Add a driver', description: 'Set up a driver account for your service area.', action: 'Add driver' },
  { to: '/view_driver', icon: '◎', category: 'Team', title: 'Driver directory', description: 'Review driver details and update assignments.', action: 'View team' },
  { to: '/view_complaints_admin', icon: '◌', category: 'Community', title: 'Resident complaints', description: 'Review requests and update their status.', action: 'Review' },
  { to: '/view_work_report', icon: '▤', category: 'Operations', title: 'Work reports', description: 'Track work updates submitted by drivers.', action: 'View reports' },
  { to: '/view_user_admin', icon: '♙', category: 'Community', title: 'Resident directory', description: 'Review registered resident accounts.', action: 'View residents' },
];

export default function AdminHome() {
  return (
    <DashboardShell role="admin" eyebrow="ADMINISTRATION" title="Operations overview" description="Manage collection points, field teams, and community requests from one place.">
      <WelcomePanel role="admin" label="Your service area" title="A cleaner city starts with a clear plan." description="Keep collection points current, support your drivers, and stay on top of resident reports." />
      <div className="section-title"><div><span>QUICK ACCESS</span><h2>Operations</h2></div><p>Choose a workspace to get started</p></div>
      <div className="action-grid action-grid--admin">{actions.map((item) => <ActionCard key={item.to} {...item} />)}</div>
    </DashboardShell>
  );
}

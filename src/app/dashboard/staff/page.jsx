'use client';

import React from 'react';
import DashboardRoute from '../../../components/shell/DashboardRoute';

export default function StaffDashboardPage() {
  return <DashboardRoute allowedRole="staff" initialDesktopView="myReports" initialMobileView="dashboard" />;
}

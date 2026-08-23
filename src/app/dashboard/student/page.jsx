'use client';

import React from 'react';
import DashboardRoute from '../../../components/shell/DashboardRoute';

export default function StudentDashboardPage() {
  return <DashboardRoute allowedRole="student" initialDesktopView="myReports" initialMobileView="dashboard" />;
}

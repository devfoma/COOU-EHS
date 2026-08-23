'use client';

import React from 'react';
import DashboardRoute from '../../../components/shell/DashboardRoute';

export default function AdminDashboardPage() {
  return <DashboardRoute allowedRole="admin" initialDesktopView="command" initialMobileView="dashboard" />;
}

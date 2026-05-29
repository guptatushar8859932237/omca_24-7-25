import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  // Retrieve and parse permissions from localStorage
  const permissions = localStorage.getItem("permissionArray") ;
  console.log(permissions)

  // Map stored permissions to actual sidebar routes
  const menuItems = [
    { path: "/Dashboard", icon: "fa-dashboard", label: "Dashboard" },
    { path: "/Enquiries", actualPath: "/Admin/Inquiry", icon: "fa-comments-o", label: "Enquiries" },
    { path: "/Manage_Patients", actualPath: "/Admin/patients", icon: "fa-wheelchair", label: "Manage Patients" },
    { path: "/Manage_Appointments", actualPath: "/Admin/Appointments", icon: "fa-calendar", label: "Manage Appointments" },
    { path: "/Manage_Services", actualPath: "/Admin/Services", icon: "fa-server", label: "Manage Services" },
   
    
    { path: "/Manage_Treatments", actualPath: "/Admin/Treatments", icon: "fa-stethoscope", label: "Manage Treatments" },
    { path: "/Manage_Hospitals", actualPath: "/Admin/Hospitals", icon: "fa-hospital-o", label: "Manage Hospitals" },
    { path: "/Manage_Countries", actualPath: "/Admin/Countries", icon: "fa-globe", label: "Manage Countries" },
    { path: "/Manage_Staffs", actualPath: "/Admin/Staff", icon: "fa-user-md", label: "Manage Staff" },
    // { path: "/Manage_Dashboard_Permission", actualPath: "/Admin/Permission", icon: "fa-lock", label: "Manage Permission" },
    { path: "/Manage_Permissions", actualPath: "/Admin/New-Permission", icon: "fa-lock", label: "Manage Permission" },
    { path: "/History", actualPath: "/Admin/History", icon: "fa-history", label: "History" },
    { path: "/Reports", actualPath: "/Admin/Reports", icon: "fa-file-text-o", label: "Reports" },
    { path: "/Earnings", actualPath: "/Admin/Earnings", icon: "fa-line-chart", label: "Payments" },
  ];

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            {menuItems.map((item) =>
              permissions.includes(item.path) ? ( // Check if permission exists
                <li key={item.path}>
                  <NavLink to={item.actualPath || item.path} className={({ isActive }) => (isActive ? "active" : "")}>
                    <i className={`fa ${item.icon}`}></i> <span>{item.label}</span> 
                  </NavLink>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

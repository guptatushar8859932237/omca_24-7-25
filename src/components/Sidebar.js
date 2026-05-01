import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  // PARSE: Comma-separated string ko array me convert karo
  let permissionsRaw = localStorage.getItem("permissionArray") || "";
  
  // Split by comma and normalize (trim + ensure leading slash)
  let permissions = permissionsRaw
    .split(',')
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => p.startsWith('/') ? p : `/${p}`); //Add slash if missing!

  console.log("Parsed permissions:", permissions);


  // ENQUIRY CHECK: Show "Enquiries" if any of these permissions are present
  const enquiryEndpoints = ["/Enquiries", "/Air_Medical_Escort", "/Ambulance_Service", "/Treatment_Estimate"];
  const hasEnquiryAccess = enquiryEndpoints.some(ep => permissions.includes(ep));

  const menuItems = [
    { path: "/Dashboard", icon: "fa-dashboard", label: "Dashboard" },
    {
      path: "/Enquiries",
      actualPath: "/Admin/Inquiry",
      icon: "fa-comments-o",
      label: "Enquiries",
      condition: hasEnquiryAccess,
    },
    {
      path: "/General_Enquiries",
      actualPath: "/Admin/General_Enquiries",
      icon: "fa-comments-o",
      label: "General Enquiries",
    },
    {
      path: "/Manage_Patients",
      actualPath: "/Admin/patients",
      icon: "fa-wheelchair",
      label: "Manage Patients",
    },
    {
      path: "/Manage_Appointments",
      actualPath: "/Admin/Appointments",
      icon: "fa-calendar",
      label: "Manage Appointments",
    },
    {
      path: "/Manage_Services",
      actualPath: "/Admin/Services",
      icon: "fa-server",
      label: "Manage Services",
    },
    {
      path: "/Manage_Countries",
      actualPath: "/Admin/Countries",
      icon: "fa-globe",
      label: "Manage Countries",
    },
    {
      path: "/Manage_Staffs",
      actualPath: "/Admin/Staff",
      icon: "fa-user-md",
      label: "Manage Staff",
    },
    {
      path: "/Manage_Permissions",
      actualPath: "/Admin/New-Permission",
      icon: "fa-lock",
      label: "Manage Permission",
    },
    {
      path: "/History",
      actualPath: "/Admin/History",
      icon: "fa-history",
      label: "History",
    },
    {
      path: "/Reports",
      actualPath: "/Admin/Reports",
      icon: "fa-file-text-o",
      label: "Reports",
    },
    {
      path: "/Payments",
      actualPath: "/Admin/Earnings",
      icon: "fa-line-chart",
      label: "Payments",
    },
    {
      path: "/Manage_Roles",
      actualPath: "/Admin/roles",
      icon: "fa-line-chart",
      label: "Manage Roles",
    },
  ];

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            {menuItems.map((item) => {
              // CONDITION CHECK: custom condition ya normal permission
              const hasPermission = item.condition !== undefined
                ? item.condition
                : permissions.includes(item.path);

              console.log(` ${item.label}: ${hasPermission ? "SHOW" : " HIDE"} (${item.path})`);

              if (hasPermission) {
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.actualPath || item.path}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <i className={`fa ${item.icon}`} />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
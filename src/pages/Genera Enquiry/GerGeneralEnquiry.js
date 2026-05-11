import React, { useState, useMemo, useEffect } from "react";

import MedicalVisa from "./MedicalVisa";
import Story from "./Story";
import ForexService from "./ForexService";
import FlightSrvices from "./FlightSrvices";
import PickUpanddrops from "./PickUpanddrops";
import NursinfCare from "./NursinfCare";
import Vil from "./Vil";
import TestForm from "./TestForm";

export default function GerGeneralEnquiry() {

  const [activeTab, setActiveTab] = useState(0);

  // ---------------- GET PERMISSIONS ----------------
  let permissionsRaw =
    localStorage.getItem("permissionArray") || "";

  let permissions = permissionsRaw
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .map((p) => (p.startsWith("/") ? p : `/${p}`));
  console.log(permissionsRaw)
  // ---------------- GET ROLE ----------------
  const role = localStorage.getItem("role") || "";

  // ---------------- ADMIN CHECK ----------------
  const isAdmin =
    role.toLowerCase() === "admin";

  console.log("Permissions:", permissions);
  console.log("Role:", role);
  console.log("Is Admin:", isAdmin);

  // ---------------- ALL TABS ----------------
  const allTabs = [
    {
      label: "Medical Visa",
      permission: "/Medical_Visa",
      component: <MedicalVisa />,
    },
    {
      label: "Guest House/Stay",
      permission: "/Guest_House_Stay",
      component: <Story />,
    },
    {
      label: "Forex Service",
      permission: "/Forex_Service",
      component: <ForexService />,
    },
    {
      label: "Flight Service",
      permission: "/Flight_Service",
      component: <FlightSrvices />,
    },
    {
      label: "Pickup and Drop",
      permission: "/Pickup_and_Drop",
      component: <PickUpanddrops />,
    },
    {
      label: "Home Care",
      permission: "/Home_Care",
      component: <Vil />,
    },
    {
      label: "Test Form",
      permission: "/Test_Form",
      component: <TestForm />,
    },
    {
      label: "Contact Us",
      permission: "/Contact_Us",
      component: <NursinfCare />,
    },
  ];

  // ---------------- FILTER TABS ----------------
  const visibleTabs = useMemo(() => {

    // ADMIN => SHOW ALL TABS
    if (isAdmin) {
      return allTabs;
    }

    // STAFF => SHOW ONLY ALLOWED TABS
    return allTabs.filter((tab) =>
      permissions.includes(tab.permission)
    );

  }, [permissions, isAdmin]);

  // ---------------- RESET ACTIVE TAB ----------------
  useEffect(() => {
    if (activeTab >= visibleTabs.length) {
      setActiveTab(0);
    }
  }, [visibleTabs, activeTab]);

  // ---------------- RETURN ----------------
  return (
    <div className="page-wrapper">

      <div className="content">

        {/* ---------------- TAB BUTTONS ---------------- */}
        <div
          className="tabs-container"
          style={{
            marginBottom: 20,
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {visibleTabs.map((tab, index) => (

            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`tab-btn ${
                activeTab === index
                  ? "active-tab"
                  : ""
              }`}
              style={{
                padding: "10px 18px",
                border: "1px solid #ccc",
                background:
                  activeTab === index
                    ? "#0ba6df"
                    : "#fff",
                color:
                  activeTab === index
                    ? "#fff"
                    : "#333",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              {tab.label}
            </button>

          ))}
        </div>

        {/* ---------------- TAB CONTENT ---------------- */}
        <div className="main_content">

          {visibleTabs.length > 0 ? (

            visibleTabs[activeTab]?.component

          ) : (

            <div
              style={{
                padding: "20px",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "600",
                color: "red",
              }}
            >
              No Permission Found
            </div>

          )}

        </div>

      </div>

    </div>
  );
}
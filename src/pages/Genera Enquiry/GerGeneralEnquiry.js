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
  let permissionsRaw = localStorage.getItem("permissionArray") || "";

  let permissions = permissionsRaw
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .map((p) => (p.startsWith("/") ? p : `/${p}`));

  console.log("Permissions =>", permissions);

  // ---------------- ADMIN CHECK ----------------
  const isAdmin = permissions.includes("/General_Enquiries");

  console.log("Is Admin =>", isAdmin);

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
      label: "Test & Scans",
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
    // ADMIN => ALL TABS
    if (isAdmin) {
      return allTabs;
    }

    // STAFF => FILTERED TABS
    return allTabs.filter((tab) => permissions.includes(tab.permission));
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
        <div className="row gx-3">
          <div className="col-md-12">
            <div className="topmainhd">
              <h6>Manage General Enquiries</h6>
            </div>
          </div>
          <div className="col-md-12">
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
                    activeTab === index ? "active-tab" : ""
                  }`}
                  style={{
                    padding: "8px 18px",
                    border: "1px solid #ccc",
                    background: activeTab === index ? "#22c7b8" : "#fafafa",
                    color: activeTab === index ? "#fff" : "#666",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "12px",
                    lineHeight: "22px",
                    fontWeight: "500",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="col-md-12">
            <div className="main_content">
              {visibleTabs.length > 0 ? (
                visibleTabs[activeTab]?.component
              ) : (
                <h4>No Permission Found</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

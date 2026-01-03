import React, { useState } from "react";
import MedicalVisa from "./MedicalVisa";
import Story from "./Story";
import ForexService from "./ForexService";
import FlightSrvices from "./FlightSrvices";
import PickUpanddrops from "./PickUpanddrops";
import NursinfCare from "./NursinfCare";
import Labstests from "./Labstests";
import Vil from "./Vil";
import Hotel from "./Hotel";
import AirAmbulance from "./AirAmbulance";
import TestForm from "./TestForm";
export default function GerGeneralEnquiry() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    "Medical Visa",
    "Stay",
    "Forex Service",
    "Flight Service",
    "Pickup and Drop",
    // "Nursing Care",
    // "Lab Test",
    // "VISA",
    // "Hotel",
    "Air Ambulance",
    "Test Form",
  ];
  const pages = [
    <MedicalVisa />,
    <Story />,
    <ForexService />,
    <FlightSrvices />,
    <PickUpanddrops />,
    // <NursinfCare />,
    // <Labstests />,
    // <Vil />,
    // <Hotel />,
    <AirAmbulance />,
    <TestForm />
  ];
  return (
    <div className="page-wrapper">
      <div className="content">
        {/* --------------- TABS UI ---------------- */}
        <div className="tabs-container" style={{ marginBottom: 20 }}>
          {tabs.map((name, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`tab-btn ${activeTab === index ? "active-tab" : ""}`}
              style={{
                padding: "10px 18px",
                border: "1px solid #ccc",
                background: activeTab === index ? "#0ba6df" : "#fff",
                color: activeTab === index ? "#fff" : "#333",
                marginRight: 5,
                marginTop: 5,
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              {name}
            </button>
          ))}
        </div>
        {/* --------------- LOAD TAB CONTENT ---------------- */}
        <div className="main_content">
          {pages[activeTab]}
        </div>
      </div>
    </div>
  );
}

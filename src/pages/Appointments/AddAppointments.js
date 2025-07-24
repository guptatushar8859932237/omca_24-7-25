import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2";

export default function AddAppointments() {
  const selectRef = useRef();

  useEffect(() => {
    $(selectRef.current).select2();

    return () => {
      $(selectRef.current).select2("destroy");
    };
  }, []);
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">New Appointments</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row">
              <div className="col-lg-12">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Appointment ID</label>
                        <input
                          className="form-control"
                          type="text"
                          value="APT-0001"
                          readonly=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="select2-example">Patient Name</label>
                        <select
                          id="select2-example"
                          ref={selectRef}
                          style={{ width: "100%" }}
                        >
                          <option value="1">Select</option>
                          <option value="2">Jennifer Robinson</option>
                          <option value="3">Terry Baker</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Department</label>
                        <select className="select">
                          <option>Select</option>
                          <option>Dentists</option>
                          <option>Neurology</option>
                          <option>Opthalmology</option>
                          <option>Orthopedics</option>
                          <option>Cancer Department</option>
                          <option>ENT Department</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Doctor</label>
                        <select className="select">
                          <option>Select</option>
                          <option>Cristina Groves</option>
                          <option>Marie Wells</option>
                          <option>Henry Daniels</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Date</label>
                        <div className="cal-icon">
                          <input
                            type="text"
                            className="form-control datetimepicker"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Time</label>
                        <div className="time-icon">
                          <input
                            type="text"
                            className="form-control"
                            id="datetimepicker3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Patient Email</label>
                        <input className="form-control" type="email" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Patient Phone Number</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      cols="30"
                      rows="4"
                      className="form-control"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label className="display-block">Appointment Status</label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        id="product_active"
                        value="option1"
                        checked
                      />
                      <label className="form-check-label" for="product_active">
                        Active
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        id="product_inactive"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        for="product_inactive"
                      >
                        Inactive
                      </label>
                    </div>
                  </div>
                  <div className="m-t-20 text-center">
                    <button className="btn btn-primary submit-btn">
                      Create Appointment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import dashboard from "../img/dashboard-doc.png";
export default function Nopermission() {
  return (
    <div className="page-wrapper">
      <div className="content">
        {/* no-permission Ask to Admin  */}
        <div className="row">
          <div className="col-md-12">
            <div className="overview">
              <div className="row align-items-center">
                <div className="col-md-4 d-flex justify-content-center">
                  <img src={dashboard} alt="" />
                </div>
                <div className="col-md-8">
                  <div className="main-heading">
                    <h3>Welcome </h3>
                    <p className="mb-0">
                      You dont't have any permission so kindely talk to
                      admin{" "}
                    </p>{" "}
                    <p className="mb-0">Have a nice day at work</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

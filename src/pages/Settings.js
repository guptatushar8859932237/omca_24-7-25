import React from 'react'

export default function Settings() {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">Settings</h4>
            </div>
          </div>
          <div className="main_content">
            <form>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Name <span className="text-danger">*</span></label>
                    <input className="form-control" type="text" value="" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Contact Person</label>
                    <input className="form-control " value="Daniel Porter" type="text" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Address</label>
                    <input className="form-control " value="3864 Quiet Valley Lane, Sherman Oaks, CA, 91403"
                      type="text" />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>Country</label>
                    <select className="form-control select">
                      <option>USA</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>City</label>
                    <input className="form-control" value="Sherman Oaks" type="text" />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>State/Province</label>
                    <select className="form-control select">
                      <option>California</option>
                      <option>Alaska</option>
                      <option>Alabama</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input className="form-control" value="91403" type="text" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" value="danielporter@example.com" type="email" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input className="form-control" value="818-978-7102" type="text" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input className="form-control" value="818-635-5579" type="text" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Fax</label>
                    <input className="form-control" value="818-978-7102" type="text" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Website Url</label>
                    <input className="form-control" value="https://www.example.com" type="text" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 text-center m-t-20">
                  <button type="button" className="btn btn-primary submit-btn">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

import React from 'react'

export default function Notifications() {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h4 className="page-title">Notifications Settings</h4>
              <div>
                <ul className="list-group notification-list">
                  <li className="list-group-item">
                    Employee
                    <div className="material-switch float-right">
                      <input id="staff_module" type="checkbox" checked="checked" />
                      <label for="staff_module" className="badge-primary"></label>
                    </div>
                  </li>
                  <li className="list-group-item">
                    Holidays
                    <div className="material-switch float-right">
                      <input id="holidays_module" type="checkbox" />
                      <label for="holidays_module" className="badge-primary"></label>
                    </div>
                  </li>
                  <li className="list-group-item">
                    Leave Request
                    <div className="material-switch float-right">
                      <input id="leave_module" type="checkbox" />
                      <label for="leave_module" className="badge-primary"></label>
                    </div>
                  </li>
                  <li className="list-group-item">
                    Events
                    <div className="material-switch float-right">
                      <input id="events_module" type="checkbox" />
                      <label for="events_module" className="badge-primary"></label>
                    </div>
                  </li>
                  <li className="list-group-item">
                    Chat
                    <div className="material-switch float-right">
                      <input id="chat_module" type="checkbox" />
                      <label for="chat_module" className="badge-primary"></label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
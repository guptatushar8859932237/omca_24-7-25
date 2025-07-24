import React from 'react'

export default function StaffLogin() {
  return (
    <>
      <div class="main-wrapper account-wrapper">
        <div class="account-page">
          <div class="account-center">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-md-10">
                  <div class="account-box">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="account-logo">
                          <a href="index.html"><img src="assets/img/logo-dark.png" alt="" /></a>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <form action="#" class="form-signin">
                          <h3>Staff Login</h3>
                          <div class="form-group">
                            <label>Username or Email</label>
                            <div class="custom-form-control">
                              <input class="input input-alt" autofocus="" placeholder=""
                                required="" type="text" />
                              <span class="input-border input-border-alt"></span>
                            </div>
                          </div>
                          <div class="form-group">
                            <label>Password</label>
                            <div class="custom-form-control">
                              <input class="input input-alt" placeholder="" required=""
                                type="password" />
                              <span class="input-border input-border-alt"></span>
                            </div>
                          </div>
                          <div class="form-group text-right">
                            <a href="forgot-password.html">Forgot your password?</a>
                          </div>
                          <div class="form-group text-center">
                            <button type="submit" class="btn btn-primary account-btn">Login</button>
                          </div>
                          {/* <div class="text-center register-link">
                            Don't have an account? <a href="register.html">Register Now</a>
                          </div> */}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

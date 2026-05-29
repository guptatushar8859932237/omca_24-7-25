import React from 'react'
import { Link } from 'react-router-dom'
import { GetUserData } from '../reducer/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import profile from '../img/doctor-03.jpg'
import { Formik, Field, ErrorMessage, Form } from "formik";
import { image } from '../Basurl/Baseurl'
export default function Profile() {
  const dispatch = useDispatch()
  const { getuser, loading, error } = useSelector((state) => state.getuser)
  useEffect(() => {
    dispatch(GetUserData())
    console.log(error, getuser)
  }, [dispatch])
  console.log(getuser)
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-7 col-6">
              <h4 className="page-title">My Profile</h4>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <div className='user-hd'>
                <h6>User Information</h6>
                <Link to="/Admin/edit-profile"><i class="fa-solid fa-pen-to-square"></i></Link>
              </div>
              <div className='row align-items-center'>
                <div className='col-md-5'>
                  <div class="profile-sidebar">
                    <div class="top">
                      <form>
                        <div class="image-wrap">
                          <div class="part-img">
                            {/* <img className="avatar" src={`${profile}${getuser.profileImage}`} alt="" /> */}
                            <img src={`${image}${getuser.profileImage}`}  className='pro-img' />
                          </div>
                          {/* <button class="image-change" type="button">
                            {/* <i class="fa fa-camera" aria-hidden="true"></i> */}
                          {/* </button> */}
                          <input type="file" class="form-control d-none" name="profile_pic" />
                        </div>
                      </form>
                      <div class="part-txt">
                        <h6>{getuser.name}</h6>
                        <p>{getuser.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-7'>
                  <div className='user-info-main'>
                    <div className='table-responsive'>
                      <table className='table'>
                        <tbody>
                          <tr>
                            <td>Phone:</td>
                            <td className='even'>{getuser.phone_no}</td>
                          </tr>
                          <tr>
                            <td>Email:</td>
                            <td className='even'>{getuser.email}</td>
                          </tr>
                          <tr>
                            <td>Role:</td>
                            <td cl assName='even'>{getuser.role}</td>
                          </tr>
                          {/* <tr>
                            <td>Address:</td>
                            <td className='even'>714 Burwell Heights Road, Bridge City, TX,77611</td>
                          </tr> */}
                          <tr>
                            <td>Gender:</td>
                            <td className='even'>{getuser.gender}</td>
                          </tr>
                        </tbody>
                      </table>
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


{/* <div className="staff-id">Employee ID : DR-0001</div> */ }
{/* <div className="staff-msg"><a href="chat.html" className="btn btn-primary">Send
                            Message</a></div> */}
{/* <div className="profile-tabs">
    <ul className="nav nav-tabs nav-tabs-bottom">
      <li className="nav-item"><a className="nav-link active" href="#about-cont" data-toggle="tab">About</a>
      </li>
      <li className="nav-item"><a className="nav-link" href="#bottom-tab2" data-toggle="tab">Profile</a></li>
      <li className="nav-item"><a className="nav-link" href="#bottom-tab3" data-toggle="tab">Messages</a></li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane show active" id="about-cont">
        <div className="row">
          <div className="col-md-12">
            <div className="card-box">
              <h3 className="card-title">Education Informations</h3>
              <div className="experience-box">
                <ul className="experience-list">
                  <li>
                    <div className="experience-user">
                      <div className="before-circle"></div>
                    </div>
                    <div className="experience-content">
                      <div className="timeline-content">
                        <a href="#/" className="name">International College of Medical
                          Science (UG)</a>
                        <div>MBBS</div>
                        <span className="time">2001 - 2003</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="experience-user">
                      <div className="before-circle"></div>
                    </div>
                    <div className="experience-content">
                      <div className="timeline-content">
                        <a href="#/" className="name">International College of Medical
                          Science (PG)</a>
                        <div>MD - Obstetrics & Gynaecology</div>
                        <span className="time">1997 - 2001</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-box mb-0">
              <h3 className="card-title">Experience</h3>
              <div className="experience-box">
                <ul className="experience-list">
                  <li>
                    <div className="experience-user">
                      <div className="before-circle"></div>
                    </div>
                    <div className="experience-content">
                      <div className="timeline-content">
                        <a href="#/" className="name">Consultant Gynecologist</a>
                        <span className="time">Jan 2014 - Present (4 years 8
                          months)</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="experience-user">
                      <div className="before-circle"></div>
                    </div>
                    <div className="experience-content">
                      <div className="timeline-content">
                        <a href="#/" className="name">Consultant Gynecologist</a>
                        <span className="time">Jan 2009 - Present (6 years 1
                          month)</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="experience-user">
                      <div className="before-circle"></div>
                    </div>
                    <div className="experience-content">
                      <div className="timeline-content">
                        <a href="#/" className="name">Consultant Gynecologist</a>
                        <span className="time">Jan 2004 - Present (5 years 2
                          months)</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-pane" id="bottom-tab2">
        Tab content 2
      </div>
      <div className="tab-pane" id="bottom-tab3">
        Tab content 3
      </div>
    </div>
  </div> */}

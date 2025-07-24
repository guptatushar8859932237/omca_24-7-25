import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo-web-large2.png';
import logodark from '../img/logo-dark.png';
import { useDispatch } from 'react-redux';
import { logout } from '../reducer/LoginSlice';
import user from '../img/user.jpg'
import { baseurl } from '../Basurl/Baseurl';
import axios from 'axios';
import { useSelector} from 'react-redux'
import { GetUserData } from '../reducer/userSlice'
import {image} from '../Basurl/Baseurl'
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { getuser, loading, error } = useSelector((state) => state.getuser)
      useEffect(() => {
        dispatch(GetUserData())
        console.log(error, getuser)
      }, [dispatch])
  const handleLogout = () => {
    axios
      .post(`${baseurl}logout`,{
        token:localStorage.getItem("token")
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Logout clicked");
    dispatch(logout()); // Dispatch the logout action
    localStorage.clear();
    navigate("/"); // Redirect to the login page
  };
  return (
    <div className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <img src={logo} height="40" alt="" />
        </Link>
        <Link to="/" className="logo-small">
          <img src={logodark} height="35" width="35" alt="" />
        </Link>
      </div>
      <a id="toggle_btn" href="javascript:void(0);"><i className="fa fa-bars"></i></a>
      <a id="mobile_btn" className="mobile_btn float-left" href="#sidebar"><i className="fa fa-bars"></i></a>
      <ul className="nav user-menu float-right">
        <li className="nav-item dropdown has-arrow">
          <a href="#" className="dropdown-toggle nav-link user-link" data-toggle="dropdown">
            <span className="user-img">
              <img className="rounded-circle" src={`${image}${getuser.profileImage}`} width="24" alt="Loading" />
              <span className="status online"></span>
            </span>
            <span>{localStorage.getItem("Role")}</span>
          </a>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="/Admin/profile">My Profile</Link>
            <Link className="dropdown-item" to="/Admin/chnage-password">Change Password</Link>
            {/* <Link className="dropdown-item" to="/Admin/settings">Settings</Link> */}
            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
          </div>
        </li>
      </ul>
      <div className="dropdown mobile-user-menu float-right">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i
          className="fa fa-ellipsis-v"></i></a>
        <div className="dropdown-menu dropdown-menu-right">
          <Link className="dropdown-item" to="/Admin/profile">My Profile</Link>
          <Link className="dropdown-item" to="/Admin/chnage-password">change password</Link>
          {/* <Link className="dropdown-item" to="/Settings">Settings</Link> */}
          <button className="dropdown-item" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

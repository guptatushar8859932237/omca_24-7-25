// // import { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // const IdleLogout = () => {
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     let timer;

// //     const logout = () => {
// //       localStorage.clear();
// //       alert("You have been logged out due to inactivity");
// //       navigate("/login");
// //     };

// //     const resetTimer = () => {
// //       clearTimeout(timer);
// //       timer = setTimeout(logout, 10000); // 10 seconds
// //     };

// //     const events = ["mousemove", "keydown", "click", "scroll"];

// //     events.forEach((event) => {
// //       window.addEventListener(event, resetTimer);
// //     });

// //     resetTimer(); // start timer

// //     return () => {
// //       clearTimeout(timer);
// //       events.forEach((event) => {
// //         window.removeEventListener(event, resetTimer);
// //       });
// //     };
// //   }, [navigate]);

// //   return null;
// // };

// // export default IdleLogout;
// import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { baseurl } from "./Basurl/Baseurl";
// import { logout } from './reducer/LoginSlice';
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// const IdleLogout = ({ timeout = 10000 }) => {
//   const navigate = useNavigate();
// const dispatch = useDispatch();
//   useEffect(() => {

//     let timer;

//     const resetTimer = () => {
//       clearTimeout(timer);
//       timer = setTimeout(logoutUser, timeout);
//     };

//     const logoutUser = () => {

//   Swal.fire({
//     title: "Are you sure?",
//     text: "You want to logout!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, Logout",
//     cancelButtonText: "Cancel"
//   }).then((result) => { 

//     if (result.isConfirmed) {

//       axios.post(`${baseurl}logout`, {
//         token: localStorage.getItem("token")
//       })
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//       dispatch(logout());
//       localStorage.clear();
//       navigate("/");

//       Swal.fire(
//         "Logged Out!",
//         "You have been logged out successfully.",
//         "success"
//       );
//     }
//   });
// };



//     // const logoutUser = () => {
//     // axios
//     //   .post(`${baseurl}logout`,{
//     //     token:localStorage.getItem("token")
//     //   })
//     //   .then((response) => {
//     //     console.log(response.data);
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //   });
//     // console.log("Logout clicked");
//     // dispatch(logout()); 
//     // localStorage.clear();
//     // navigate("/"); 
//     // };

//     const events = [
//       "mousemove",
//       "keydown",
//       "click",
//       "scroll"
//     ];

//     events.forEach((event) => {
//       window.addEventListener(event, resetTimer);
//     });

//     resetTimer();

//     return () => {
//       events.forEach((event) => {
//         window.removeEventListener(event, resetTimer);
//       });
//       clearTimeout(timer);
//     };

//   }, [timeout, navigate]);

//   return null;
// };

// export default IdleLogout;

import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "./Basurl/Baseurl";
import { logout } from "./reducer/LoginSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const IdleLogout = ({ timeout = 1000000 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const timer = useRef(null);
  const isLoggedOut = useRef(false);

  useEffect(() => {

    const logoutUser = () => {

      if (isLoggedOut.current) return; // prevent multiple logout
      isLoggedOut.current = true;

      Swal.fire({
        title: "Are you sure?",
        text: "You want to logout!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Logout",
        cancelButtonText: "Cancel"
      }).then((result) => {

        if (result.isConfirmed) {

          axios.post(`${baseurl}logout`, {
            token: localStorage.getItem("token")
          }).catch((error) => {
            console.log(error);
          });

          dispatch(logout());
          localStorage.clear();

          navigate("/");
        } else {
          isLoggedOut.current = false;
          resetTimer();
        }

      });
    };

    const resetTimer = () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(logoutUser, timeout);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimeout(timer.current);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };

  }, [timeout]);

  return null;
};

export default IdleLogout;
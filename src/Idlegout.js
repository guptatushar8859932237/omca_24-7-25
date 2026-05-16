// import axios from "axios";
// import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { baseurl } from "./Basurl/Baseurl";
// import { logout } from "./reducer/LoginSlice";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";

// const IdleLogout = ({ timeout = 500000 }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const timer = useRef(null);
//   const isLoggedOut = useRef(false);

//   useEffect(() => {

//     const logoutUser = () => {

//       // if (isLoggedOut.current) return; // prevent multiple logout
//       // isLoggedOut.current = true;

//       // Swal.fire({
//       //   title: "Are you sure?",
//       //   text: "You want to logout!",
//       //   icon: "warning",
//       //   showCancelButton: true,
//       //   confirmButtonText: "Yes, Logout",
//       //   cancelButtonText: "Cancel"
//       // }).then((result) => {

//       //   if (result.isConfirmed) {

//           axios.post(`${baseurl}logout`, {
//             token: localStorage.getItem("token")
//           }).catch((error) => {
//             console.log(error);
//           });

//           dispatch(logout());
//           localStorage.clear();

//           navigate("/");
//         } 
//         // else {
//         //   isLoggedOut.current = false;
//         //   resetTimer();
//         // }

//       });
//     };

//     const resetTimer = () => {
//       clearTimeout(timer.current);
//       timer.current = setTimeout(logoutUser, timeout);
//     };

//     const events = ["mousemove", "keydown", "click", "scroll"];

//     events.forEach((event) =>
//       window.addEventListener(event, resetTimer)
//     );

//     resetTimer();

//     return () => {
//       clearTimeout(timer.current);
//       events.forEach((event) =>
//         window.removeEventListener(event, resetTimer)
//       );
//     };

//   }, [timeout]);

//   return null;
// };

// export default IdleLogout;
import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "./Basurl/Baseurl";
import { logout } from "./reducer/LoginSlice";
import { useDispatch } from "react-redux";
const IdleLogout = ({ timeout = 900000 }) => { // 5 minutes
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timer = useRef(null);
  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post(`${baseurl}logout`, {
          token: localStorage.getItem("token"),
        });
      } catch (error) {
        console.log(error);
      }
      dispatch(logout());
      // localStorage.clear();
      navigate("/");
    };
    const resetTimer = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(logoutUser, timeout);
    };
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
    resetTimer();
    return () => {
      if (timer.current) clearTimeout(timer.current);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [timeout, dispatch, navigate]);
  return null;
};
export default IdleLogout;
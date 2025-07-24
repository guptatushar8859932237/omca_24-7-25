import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected({ Component }) {
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem("email");
    if (!login) {
      navigate("/");
    }
  }, [navigate]); // Adding `navigate` as a dependency

  return <Component />;
}

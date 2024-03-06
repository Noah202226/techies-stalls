import React from "react";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div>
      <h2>Login Page</h2>

      <NavLink to={"../about"}>View About</NavLink>
    </div>
  );
}

export default Login;

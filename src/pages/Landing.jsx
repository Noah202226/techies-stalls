import React from "react";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <NavLink className="btn btn-primary" to={"stalls"}>
            Get Started
          </NavLink>
        </div>
      </div>
    </div>
    // <NavLink className="btn" to={"login"}>
    //   Login
    // </NavLink>
  );
}

export default Landing;

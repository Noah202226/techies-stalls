import React from "react";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={"/computer-service.svg"} className="max-w-sm rounded-lg" />
        <div>
          <h1 className="text-5xl font-bold">Techies Stall</h1>
          <p className="py-6">
            "Our tech stall store application is a cutting-edge platform
            designed to revolutionize the way customers experience and purchase
            technology products. With a sleek and intuitive interface, our
            application offers a wide range of tech gadgets, accessories, and
            services, all in one convenient location.
            <br />
            <br />
            From the latest smartphones and laptops to smart home devices and
            gaming peripherals, our store has everything tech enthusiasts need.
            Our curated selection of products ensures that customers can find
            the perfect tech solution for their needs, whether they are looking
            for productivity tools or entertainment devices.
            <br />
            <br />
            In addition to our vast product catalog, our application also
            provides a seamless shopping experience with secure payment options,
            fast delivery, and excellent customer service. With our tech stall
            store application, customers can stay ahead of the curve with the
            latest tech trends and innovations at their fingertips."
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

import React from "react";
import logo from "../assets/logo2.png";

const Footer = () => {
  return (
    <>
      <div className="h-85 bg-zinc-700">
        <div className="flex flex-col m-14 items-center justify-center text-white p-8 gap-6">
          <p>
            --- Your favorite food delivery platform connecting customers with
            restaurants and riders. ---
          </p>

          <div className="flex items-center justify-between gap-25 p-8">
            <img src={logo} alt="" className="w-35" />
            <div>
              <span className="font-medium">Quick Links</span>
            </div>
            <div>
              <span>For Restaurants</span>
            </div>
            <div>
              <span>For Riders</span>
            </div>
            <div>
              <span>Feedback & Support</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

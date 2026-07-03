import React from "react";
import NotFoundAnimation from "../assets/NotFound.svg";

const NotFound = () => {
  return (
    <>
      <div className="min-h-[92vh] flex justify-center items-center bg-(--background-color)">
        <img src={NotFoundAnimation} alt="Not Found" className="w-1/2" />
      </div>
    </>
  );
};

export default NotFound;

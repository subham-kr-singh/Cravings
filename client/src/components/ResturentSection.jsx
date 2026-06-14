import { useState } from "react";
import ResturentCard from "./ResturentCard";

function ResturentSection() {
  const [totalResturent, setTotalResturent] = useState(3);
  return (
    <>
      <div className="bg-linear-to-b from-orange-700 to-[#FCFCFC] w-full flex items-center justify-center p-10 h-ful">
        <div className="flex flex-col justify-center gap-8 w-full px-75 md:px-5 lg:px-50 h-full">
          <div className="flex flex-col items-start justify-center gap-5">
            <h1 className="text-4xl font-bold text-white">
              Featured Restaurants
            </h1>
            <span className="text-xl font-light text-white">
              {totalResturent} restaurants available
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center h-100">
            <ResturentCard />
            <ResturentCard />
            <ResturentCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResturentSection;

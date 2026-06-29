import { useState } from "react";
import ResturentCard from "./ResturentCard";

function ResturentSection() {
  const [totalResturent, setTotalResturent] = useState(3);
  return (
    <>
      <div className="bg-linear-to-b from-orange-700 to-[#FCFCFC] w-full flex items-center justify-center p-10">
        <div className="flex flex-col justify-center gap-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col items-start justify-center gap-5">
            <h1 className="text-4xl font-bold text-white">
              Featured Restaurants
            </h1>
            <span className="text-xl font-light text-white">
              {totalResturent} restaurants available
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full">
            <ResturentCard />
            <ResturentCard />
            <ResturentCard />
            <ResturentCard />
            <ResturentCard />
            <ResturentCard />
            <ResturentCard />
            <ResturentCard />
            <ResturentCard />
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

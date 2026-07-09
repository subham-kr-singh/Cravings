import React from "react";

const Overviews = () => {
  return (
    <>
      <div className="min-h-[92vh] space-y-6">
        <div className="w-full rounded-3xl h-2/4 py-6 px-5 flex flex-col gap-6 bg-[url('https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1600&q=80')] bg-no-repeat bg-cover bg-center">
          <span className="w-24 rounded-4xl p-1 px-2 bg-(--primary-color) text-white">
            New Deals
          </span>
          <h1 className="text-5xl font-bold text-white ">
            Welcome to Cravings
          </h1>

          <p className="text-xl font-medium w-1/2 text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            laudantium laboriosam, blanditiis autem
          </p>

          <button className="rounded-lg bg-(--primary-color) px-5 py-3 font-medium text-white transition hover:bg-(--secondary-color) w-35">
            Order Now
          </button>
        </div>

        <div className="container bg-white box-border">
          <card>
            <div className="">
              
            </div>
          </card>
        </div>
      </div>
    </>
  );
};

export default Overviews;

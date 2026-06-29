import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";

const Hero = () => {
  return (
    <section
      className="relative flex min-h-[92vh] items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1800&auto=format&fit=crop')",
      }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center text-white">
        <h2 className="mt-8 max-w-4xl text-5xl font-bold leading-tight">
          Discover the Best Food
          <br />
          Delivered to Your Doorstep
        </h2>

        <p className="mt-6 max-w-2xl text-xl text-gray-200">
          Order from the best restaurants near you and enjoy fresh meals
          delivered in minutes.
        </p>

        {/* Search Bar */}
        <div className="mt-12 flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Search */}
          <div className="flex flex-1 items-center px-5">
            <IoSearch size={22} className="text-(--text-light)" />

            <input
              type="text"
              placeholder="Search for restaurants, cuisines or dishes..."
              className="w-full px-4 py-5 text-(--text-color) outline-none"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 flex flex-wrap justify-center gap-12 text-center">
          <div>
            <h3 className="text-3xl font-bold">1000+</h3>
            <p className="mt-2 text-gray-300">Restaurants</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">4.8★</h3>
            <p className="mt-2 text-gray-300">Customer Rating</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">30 Min</h3>
            <p className="mt-2 text-gray-300">Average Delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

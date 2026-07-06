import { FaStar } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";

const RestaurantCard = (prop) => {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
          alt="Restaurant"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Offer */}
        <span className="absolute left-4 top-4 rounded-full bg-(--primary-color) px-3 py-1 text-sm font-semibold text-white">
          50% OFF
        </span>

        {/* Rating */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-lg bg-white px-2 py-1 shadow">
          <FaStar className="text-yellow-500" />
          <span className="font-semibold">4.7</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-(--text-color)">
            Under The Mango Tree
          </h2>

          <span className="rounded-lg bg-green-100 px-2 py-1 text-sm font-medium text-green-700">
            Open
          </span>
        </div>

        <p className="text-(--text-light)">North Indian • Mughlai • BBQ</p>

        <div className="flex items-center justify-between text-sm text-(--text-light)">
          <span className="flex items-center gap-1">
            <IoTimeOutline />
            25 mins
          </span>

          <span>₹250 for one</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-(--text-light)">
          <MdLocationOn />
          Bhopal
        </div>

        <button className="mt-2 w-full rounded-xl bg-(--primary-color) py-3 font-semibold text-white transition hover:bg-(--secondary-color)">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;



import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center h-170 text-white gap-8 bg-[url(./bg-img.png)] opacity-85">
      <span className="text-5xl font-bold text-center">
        Your Favorite Food, <br /> Delivered Fast
      </span>
      <p className="text-xl text-center">
        Order from thousands of restaurants and get it delivered to your
        doorstep
      </p>

      <div className="flex items-center justify-between gap-5">
        <Link to={"/register"}>
          <button className="text-white bg-orange-700 px-7 py-3 rounded hover:bg-orange-800  font-medium">
            Sign Up
          </button>
        </Link>
        <button className="bg-white text-black px-8 py-3 hover:bg-zinc-100 rounded  font-medium">
          Order now
        </button>
      </div>
    </div>
  );
}

export default Hero;

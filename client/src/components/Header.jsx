import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <>
      <div className="bg-orange-700 p-2 flex items-center justify-between px-12">
        <Link to={"/"}>
          <img src={logo} alt="Logo" className="w-21" />
        </Link>

        <div className="flex gap-4 items-center justify-between">
          <Link to={"/login"}>
            <button className="text-white border-white px-3 py-1 rounded hover:border-white hover:border-2">
              Login
            </button>
          </Link>
          <Link to={"/register"}>
            <button className="text-orange-600 bg-white px-3 py-1 rounded hover:bg-orange-700 hover:text-white">
              Register
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;

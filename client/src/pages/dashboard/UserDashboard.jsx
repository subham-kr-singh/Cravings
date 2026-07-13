import React, { useState } from "react";
import Sidebar from "../../components/customerDashboard/Sidebar";
import Overview from "../../components/customerDashboard/Overview";
import Orders from "../../components/customerDashboard/Orders";
import WishList from "../../components/customerDashboard/WishList";
import Settings from "../../components/customerDashboard/Settings";

const UserDashboard = () => {
  const [active, setActive] = useState("Overview");
  return (
    <>
      <div className="h-[92vh] flex bg-(--background-color)">
        <div className="w-1/5 h-full border border-(--border-color) flex flex-col gap-5 ">
          <Sidebar active={active} setActive={setActive} />
        </div>
        <div className="w-4/5 h-full px-8 py-8 border border-(--border-color)">
          {active === "Overview" && <Overview />}
          {active === "Orders" && <Orders />}
          {active === "WishList" && <WishList />}
          {active === "Settings" && <Settings />}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

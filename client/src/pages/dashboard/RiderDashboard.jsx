import React, { useState } from "react";
import Sidebar from "../../components/riderDashboard/RiderSidebar";
import Overview from "../../components/riderDashboard/RiderOverview";
import Orders from "../../components/riderDashboard/RiderOrders";
import Settings from "../../components/riderDashboard/RiderSetting";

const RiderDashboard = () => {
  const [active, setActive] = useState("overview");
  
  return (
    <>
      <div className="h-[92vh] flex bg-(--background-color)">
        <div className="w-1/5 h-full border border-(--border-color) flex flex-col gap-5 p-4">
          <Sidebar activeTab={active} setActiveTab={setActive} />
        </div>
        <div className="w-4/5 h-full px-8 py-8 border border-(--border-color) overflow-y-auto">
          {active === "overview" && <Overview />}
          {active === "orders" && <Orders />}
          {active === "settings" && <Settings />}
        </div>
      </div>
    </>
  );
};

export default RiderDashboard;
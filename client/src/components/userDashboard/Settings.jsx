import React from "react";
import { useAuth } from "../../context/AuthContext";

const Setting = () => {
  const { user, isLogin } = useAuth();
  return (
    <>
      <div className="bg-(--background-color) flex flex-col justify-center items-center">
        <div>Welcome Back!! {user.fullName}</div>
        <div>Welcome Back!! {user.email}</div>
        <div>Welcome Back!! {user.phone}</div>
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={user.photo.url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Setting;

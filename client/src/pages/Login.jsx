import React from "react";

function Login() {
  return (
    <>
      <div className="h-screen bg-[url('../../public/bg-img.png')] bg-no-repeat bg-cover bg-center flex items-center px-20">
        <div className="bg-white h-1/2 w-1/4 rounded-2xl p-4 flex flex-col items-center justify-center p-10">
          <span className="text-3xl font-bold text-orange-700">
            Welcome Back
          </span>
          <p>Login to your Cravings account</p>
          <form className="flex flex-col w-full gap-2 ">
            <label htmlFor="email" className="">Email</label>
            <input type="email" name="email" placeholder="Enter your email" className="border rounded py-1 px-2" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

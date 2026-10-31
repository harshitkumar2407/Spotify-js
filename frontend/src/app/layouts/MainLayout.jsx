import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../shared/ui/components/Navbar";
import GlobalPlayer from "../../features/player/ui/GlobalPlayer";

const MainLayout = () => {

  console.log("main Layout");
  
  return (
    <div className="grid grid-rows-[1fr_6fr_1fr] p-2 gap-6 bg-black h-screen text-white">
      <nav className="  "><Navbar/></nav>
      <div className="gap-6 grid grid-cols-[2fr_6fr_2fr]">
        <div className=" rounded-xl p-4 bg-[#101513]">library</div>
        <div className=" rounded-xl p-4 bg-[#101513]">
          <Outlet />
        </div>
        <div className=" rounded-xl p-4 bg-[#101513]">Side bar</div>
      </div>

      <div className=" p-4 bg-[#101513]">
        <GlobalPlayer/>
      </div>
    </div>
  );
};

export default MainLayout;

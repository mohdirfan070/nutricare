import React from "react";

function TopNavbar() {
  return (
    <div className="relative h-[6dvh] ">
      <img
        className="w-full scale-y-[90%] absolute  -top-[1dvh] sm:-top-[3.5dvh] md:-top-[9.5dvh] lg:-top-[19.5dvh] drop-shadow-lg "
        src="./src/assets/top-nav.svg"
        alt=""
      />
      <h1 className="font-3-semibold text-[5dvh] text-darkgreen  absolute top-[1.5vh] left-[2vh]  ">
        Nutricare
      </h1>
    </div>
  );
}

export default TopNavbar;

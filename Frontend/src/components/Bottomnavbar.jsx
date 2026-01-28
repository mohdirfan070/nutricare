import React from "react";
import {Link} from 'react-router-dom'
export default function Bottomnavbar() {
  return (
    <div className="w-full  bottom-0 h-[8dvh] rounded-t-[12px] bg-dimgreen flex flex-row justify-around items-center">
    <Link to={'home'} ><img className="h-[3.5dvh]" src="./src/assets/home.svg" alt="" /></Link>
      <Link to={'scanner'} > <img className="h-[3.5dvh]" src="./src/assets/add-square.svg" alt="" />   </Link>
      <Link to={'history'} > <img className="h-[3.5dvh]" src="./src/assets/history.svg" alt="" /></Link>
      <Link to={'profile'} > <img className="h-[3.5dvh]" src="./src/assets/user-circle.svg" alt="" /></Link>
    </div>
  );
}

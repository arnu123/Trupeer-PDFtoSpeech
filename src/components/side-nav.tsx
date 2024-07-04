"use client";


import React, { useState } from "react";


import Link from "next/link";
import { usePathname } from "next/navigation";


import { SIDENAV_ITEMS } from "../constants";
import { SideNavItem } from "../types";
import { Icon } from "@iconify/react";

const NavEndNode = ({ item, pathname }: any) => {
 const [isHovered, setIsHovered] = useState(false);
 const isActive = item.paths.includes(pathname);
 const icon = isHovered || isActive ? item.lightIcon : item.darkIcon;


 return (
   <Link
     href={item.paths[0]} // Assuming item.paths[0] is a valid URL
     className={`flex flex-row items-center text-black hover:bg-purple-ai hover:text-white ${
       isActive ? "bg-purple-ai text-white" : ""
     }`}
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
   >
     <div className="flex py-2 px-6 space-x-4 items-center">
       {icon}
       <span className="flex">{item.title}</span>
     </div>
   </Link>
 );
};


const SideNav = () => {
    return (
        <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
            <div className="flex flex-col space-y-6 w-full items-center">
                <div className="flex items-center justify-center w-full py-4">
                    <img
                        src="logo.png"
                        alt="Logo"
                        className="w-29 h-230"
                    />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                    {SIDENAV_ITEMS.map((item, idx) => {
                        return <MenuItem key={idx} item={item} />;
                    })}
                </div>
            </div>
        </div>
    );
};

const SideNavWrapper = () => {
  const pathname = usePathname();
  const isVideoPage = pathname === "/intro";
  if (!isVideoPage) {
    return null
  } 
  return <SideNav />
}

export default SideNavWrapper;


const MenuItem = ({ item }: { item: SideNavItem }) => {
 const pathname = usePathname();
 const [subMenuOpen, setSubMenuOpen] = useState(false);
 const toggleSubMenu = () => {
   setSubMenuOpen(!subMenuOpen);
 };


 return (
   <div>
     {item.submenu ? (
       <>
         <button
           onClick={toggleSubMenu}
           className={`flex flex-row items-center p-2 w-full justify-between hover:bg-[#B93fA8] ${
             pathname.includes(item.paths[0]) ? "bg-[#B93FA8]" : ""
           }`}
         >
           <div className="flex flex-row space-x-4 items-center md:pl-6">
             {item.lightIcon}
             <span className="flex">{item.title}</span>
           </div>


           <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
             <Icon icon="lucide:chevron-down" width="24" height="24" />
           </div>
         </button>


         {subMenuOpen && (
           <div className="my-2 ml-12 flex flex-col space-y-4">
             {item.subMenuItems?.map((subItem, idx) => {
               return (
                 <Link
                   key={idx}
                   href={subItem.paths[0]}
                   className={`${
                     subItem.paths.includes(pathname) ? "font-semibold" : ""
                   }`}
                 >
                   <span>{subItem.title}</span>
                 </Link>
               );
             })}
           </div>
         )}
       </>
     ) : (
       <NavEndNode item={item} pathname={pathname} />
     )}
   </div>
 );
};

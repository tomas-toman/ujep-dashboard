"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Logo from "@/assets/images/logo.png";
import DashboardIcon from "@/assets/icons/DashboardIcon.svg"
import ScheduleIcon from "@/assets/icons/ScheduleIcon.svg"
import GradesIcon from "@/assets/icons/GradesIcon.svg"
import MenuIcon from "@/assets/icons/MenuIcon.svg"
import CloseIcon from "@/assets/icons/CloseIcon.svg"

const menuItems = [
  { name: "Dashboard", href: "/home", icon: DashboardIcon, alt: "Dashboard icon" },
  { name: "Schedule", href: "/schedule", icon: ScheduleIcon, alt: "Schedule icon" },
  { name: "Grades", href: "/grades", icon: GradesIcon, alt: "Grades icon" },
];

export default function sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button onClick={toggleSidebar} className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-theme-white rounded-md shadow-md">
        {isOpen ? <Image src={CloseIcon} alt="Close icon"/> : <Image src={MenuIcon} alt="Menu icon" />}
      </button>

      <aside className={`w-full sm:w-64 min-h-screen sticky top-0 flex flex-col bg-theme-white ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:relative sm:translate-x-0`}>
        <a href="/">
          <div className="py-4 justify-center flex">
            <Image src={Logo} alt="Logo" className="w-44" loading="eager"/>
          </div>
        </a>
        
        <nav>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`justify-center sm:justify-normal flex py-3 px-8 ${isActive ? "bg-theme-cream" : "hover:bg-theme-cream"}`}
              >
                <Image src={item.icon} alt={item.alt} className="mr-2" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  )
}
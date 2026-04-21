'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import Logo from '@/assets/images/logo.png';
import DashboardIcon from '@/assets/icons/DashboardIcon.svg'
import ScheduleIcon from '@/assets/icons/ScheduleIcon.svg'
import GradesIcon from '@/assets/icons/GradesIcon.svg'

const menuItems = [
  { name: 'Dashboard', href: '/home', icon: DashboardIcon, alt: 'Dashboard icon' },
  { name: 'Schedule', href: '/schedule', icon: ScheduleIcon, alt: "Schedule icon" },
  { name: 'Grades', href: '/grades', icon: GradesIcon, alt: "Grades icon" },
];

export default function sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen sticky top-0 flex flex-col bg-theme-white">
      <div className="py-4 justify-center flex">
        <Image src={Logo} alt="Logo" className='w-44'/>
      </div>
      
      <nav>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex py-3 px-8 rounded-lg ${isActive ? 'bg-theme-cream' : 'hover:bg-theme-cream'}`}
            >
              <Image src={item.icon} alt={item.alt} className="mr-2" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  )
}
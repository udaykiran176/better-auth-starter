"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

type Props = {
   label: string;
   href: string;
   icon: React.ReactNode;
   onClick?: () => void;
}

export const SidebarItem = ({ label, href, icon, onClick }: Props) => {
    const pathname = usePathname();
    const active = pathname === href || (pathname.startsWith(href) && href !== '/');
    
    return (
        <Button variant={
            active ? "sidebarOutline" : "sidebar"}
             className="justify-start h-[52px]" 
             asChild>
            <Link 
              href={href} 
              className="flex items-center gap-x-2"
              onClick={onClick}
            >
                {icon}
                {label}
            </Link>
        </Button>
    )
}


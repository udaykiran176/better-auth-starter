import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { HomeIcon, UserIcon, ShoppingCartIcon, BookIcon, MedalIcon, ProjectorIcon } from "lucide-react";

type Props = {
  className?: string;
  onClose?: () => void;
}

export const Sidebar = ({ className, onClose }: Props) => {
    return (
        <div  className={cn(
            "flex bg-white h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className,
            )}>
                
            <Link href="/">
             <div className="pt-8 pl-4 pb-7 flex items-center gap-x-1">
                 <Image src="/atribot.svg" height={50} width={120} alt="atribot" />
            </div>
            </Link>

            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem href="/dashboard" label="Dashboard" icon={<HomeIcon className="w-5 h-5" />} onClick={onClose} />
                <SidebarItem href="/learn" label="Learn" icon={<BookIcon className="w-5 h-5" />} onClick={onClose} />
                <SidebarItem href="/projects" label="Projects" icon={<ProjectorIcon className="w-5 h-5" />} onClick={onClose} />
                <SidebarItem href="/leaderboard" label="Leaderboard" icon={<MedalIcon className="w-5 h-5" />} onClick={onClose} />
                <SidebarItem href="/shop" label="Shop" icon={<ShoppingCartIcon className="w-5 h-5" />} onClick={onClose} />
                <SidebarItem href="/profile" label="Profile" icon={<UserIcon className="w-5 h-5" />} onClick={onClose} />
            </div>

        </div>
    )
}

export default Sidebar
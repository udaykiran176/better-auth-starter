
import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
    return (
       <nav className="lg:hidden px-6 h-[50px] flex items-center bg-blue-500 border-b fixed top-0 left-0 right-0 z-50">
            <MobileSidebar/>
       </nav>
    )
}
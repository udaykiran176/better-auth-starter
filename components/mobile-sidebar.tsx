"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {
   Sheet,
   SheetTrigger,
   SheetContent,
   SheetTitle,
} from "@/components/ui/sheet";

import Sidebar from "./sidebar";

export const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <button>
                    <Menu className="text-white"/>
                </button>
            </SheetTrigger>
            <SheetContent className="p-0 z-50" side="left">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <Sidebar onClose={() => setIsOpen(false)} />
            </SheetContent>
        </Sheet>
    )
}

//user-profile
import { getCurrentUser } from "@/server/users";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

export const UserProfile = async () => {
    let currentUser = null;
    try {
      const userData = await getCurrentUser();
      currentUser = userData?.currentUser || null;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
    return (
        <div>
            {currentUser ? (
                <div className="flex items-center gap-4">
                   {/* avatar */}
                <Link href="/profile"> 
                <Avatar>
                    <AvatarFallback className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center text-lg font-medium">
                        <p className="text-lg font-medium  pb-2">{currentUser.name?.[0]?.toUpperCase() || 'A'}</p>
                    </AvatarFallback>
                </Avatar>
                </Link>                
                </div>
            ) : (
                <div className="space-y-4 flex flex-col max-w-[300px]">
        
                    <Link href="/login">
                        <Button variant="primaryOutline" className="w-auto px-4">
                          Login
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}
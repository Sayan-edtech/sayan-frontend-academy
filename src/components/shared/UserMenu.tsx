import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, HelpCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Routes } from "@/constants/enums";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
<<<<<<< HEAD:src/components/shared/UserMenu.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUserProfile } from "@/hooks/useUserQueries";
=======
import RemoteImage from "../RemoteImage";
>>>>>>> typescript-front/production:src/components/shared/dashboard/UserMenu.tsx

export function UserMenu({ align }: { align?: "start" | "end" | "center" }) {
  const { user } = useAuth();
  const { logout } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    user && (
      <div className="flex items-center gap-4">
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                {user?.avatar ? (
                  <RemoteImage
                    prefix="static"
                    src={user.avatar}
                    alt={user.fname}
                    className="!h-10 !w-10 object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-primary text-white">
                    {user.fname?.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 border-border"
            align={align || "end"}
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {`${user.fname} ${user.lname}`}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                to={Routes.DASHBOARD}
                className="cursor-pointer flex items-center gap-2"
              >
                <Home className="mr-2 h-4 w-4" />
                <span>لوحة التحكم</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={Routes.DASHBOARD_PROFILE}
                className="cursor-pointer flex items-center gap-2"
              >
                <User className="mr-2 h-4 w-4" />
                <span>الملف الشخصي</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={Routes.CONTACT}
                className="cursor-pointer flex items-center gap-2"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>المساعدة والدعم</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>تسجيل الخروج</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  );
}

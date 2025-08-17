import Navbar, { links } from "./navbar";
import AuthLinks from "./auth-links";
import MobileMenu from "./mobile-menu";
import { Link } from "react-router-dom";
import type { Settings } from "@/types/academy";
import RemoteImage from "@/components/shared/RemoteImage";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUserProfile } from "@/hooks/useUserQueries";
import { UserMenu } from "../UserMenu";

export default function Header({ settings }: { settings: Settings }) {
  const { data: user, isPending } = useCurrentUserProfile();
  return (
    <header className="py-8 fixed left-0 w-full top-0 z-50">
      <div className="container">
        <div
          style={{
            background:
              "linear-gradient(91.81deg, rgba(255, 255, 255, 0.87) 21.24%, rgba(255, 255, 255, 0.87) 109.59%)",
          }}
          className="p-4 backdrop-blur rounded-[20px] flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center flex-1 justify-between lg:justify-start gap-4 lg:gap-10">
            <Link to="/">
              <RemoteImage
                src={settings.logo}
                alt="Logo"
                loading="eager"
                className="h-[45px] object-contain"
              />
            </Link>
            <MobileMenu links={links} />
            <Navbar />
          </div>
          {isPending ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <UserMenu />
          ) : (
            <AuthLinks />
          )}
        </div>
      </div>
    </header>
  );
}

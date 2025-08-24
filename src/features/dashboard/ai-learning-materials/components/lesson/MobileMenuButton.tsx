import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuButtonProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function MobileMenuButton({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: MobileMenuButtonProps) {
  return (
    <div className="lg:hidden">
      <Button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        variant="ghost"
        size="icon"
        className="text-gray-600 hover:bg-gray-100 -ml-2"
      >
        <Menu className="w-5 h-5" />
      </Button>
    </div>
  );
}

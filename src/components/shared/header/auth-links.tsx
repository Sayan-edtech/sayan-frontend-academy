import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Link } from "react-router-dom";

interface AuthLinksProps {
  className?: string;
}

export default function AuthLinks({ className = "" }: AuthLinksProps) {
  return (
    <div className={`hidden lg:flex items-center gap-6 ${className}`}>
      <Link
        to={`/${Routes.AUTH}/${Pages.SIGNIN}`}
        className={`${buttonVariants({
          variant: "secondary",
        })} !text-lg !font-medium border border-border hover:border-primary hover:text-primary transition-colors`}
      >
        دخول
      </Link>
      <Link
        to={`/${Routes.AUTH}/${Pages.SIGNUP}`}
        className={`${buttonVariants({ size: "lg" })} !font-bold`}
      >
        حساب جديد
      </Link>
    </div>
  );
}

import { Pages, Routes } from "@/constants/enums";
import AuthForm from "@/features/auth/components/AuthForm";
import { getAcademyPath, hasSubdomain } from "@/lib/subdomain";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

function ResetPassword() {
  const searchParams = useSearchParams();
  const { academySlug } = useParams() as { academySlug: string };
  const academyPath = hasSubdomain() ? "" : getAcademyPath({ academySlug });
  const { verification_token } = Object.fromEntries(searchParams[0]);
  if (!verification_token) {
    return (
      <Navigate
        to={`${academyPath}/${Routes.AUTH}/${Pages.FORGOT_PASSWORD}`}
        replace
      />
    );
  }
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-card-foreground">
          استعادة كلمة المرور
        </h1>
        <p className="text-muted-foreground text-lg">
          أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور الخاصة
          بك.
        </p>
      </div>
      <AuthForm slug={Pages.RESET_PASSWORD} />
    </div>
  );
}

export default ResetPassword;

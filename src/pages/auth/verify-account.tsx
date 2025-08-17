import { Pages, Routes } from "@/constants/enums";
import AuthForm from "@/features/auth/components/AuthForm";
import { getAcademyPath, hasSubdomain } from "@/lib/subdomain";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

function VerifyAccount() {
  const searchParams = useSearchParams();
  const { academySlug } = useParams() as { academySlug: string };
  const academyPath = hasSubdomain() ? "" : getAcademyPath({ academySlug });
  const { email } = Object.fromEntries(searchParams[0]);
  if (!email) {
    return (
      <Navigate to={`${academyPath}/${Routes.AUTH}/${Pages.SIGNIN}`} replace />
    );
  }
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-card-foreground">
          تحقق من حسابك
        </h1>
        <p className="text-muted-foreground text-lg">
          أدخل رمز التحقق المكون من 6 أرقام المرسل إلى بريدك الإلكتروني
          <span className="text-primary mr-2">{email}</span>
        </p>
      </div>
      <AuthForm slug={Pages.VERIFY_ACCOUNT} />
    </div>
  );
}

export default VerifyAccount;

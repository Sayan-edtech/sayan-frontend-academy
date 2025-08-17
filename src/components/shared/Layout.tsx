import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Routes } from "@/constants/enums";
import { useAcademy } from "@/features/home/hooks/useAcademyQueries";
import type { AcademyResponse } from "@/types/academy";
import { Helmet } from "react-helmet-async";
import { Navigate, Outlet } from "react-router-dom";

export interface OutletContext {
  academyInfo: AcademyResponse;
}
function Layout() {
  const subdomain = window.location.hostname.split(".")[0];
  const { data: academyInfo, isPending } = useAcademy({
    subdomain: subdomain,
  });

  if (!isPending && !academyInfo) {
    return <Navigate to={Routes.ROOT} state={{ from: location }} replace />;
  }

  return (
    !isPending &&
    academyInfo && (
      <>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="This is the home page of our app."
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        </Helmet>
        <Header settings={academyInfo.data.settings} />
        <Outlet context={{ academyInfo: academyInfo.data }} />
        <Footer settings={academyInfo.data.settings} />
      </>
    )
  );
}

export default Layout;

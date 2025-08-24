import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NotFound from "@/pages/not-found";
import CourseDetails from "@/pages/courses/[slug]";
<<<<<<< HEAD
import { academyAuthRoutes } from "./AuthRoutes";
import Home from "@/pages";
import Layout from "@/components/shared/Layout";
=======
import LaunchAcademy from "@/pages/launch-academy";
import EmployeeTraining from "@/pages/employee-training";
import Ai from "@/pages/ai";
import { dashboardRoutes } from "./DashboardRoutes";
import { authRoutes } from "./AuthRoutes";
import { academyRoutes } from "./academy-routes";
>>>>>>> typescript-front/production

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
<<<<<<< HEAD
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="courses/:courseSlug" element={<CourseDetails />} />
        {academyAuthRoutes}
      </Route>

=======
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="courses/:courseSlug" element={<CourseDetails />} />
      <Route path="launch-academy" element={<LaunchAcademy />} />
      <Route path="ai" element={<Ai />} />
      <Route path="employee-training" element={<EmployeeTraining />} />
      {dashboardRoutes}
      {authRoutes}
      {academyRoutes}
>>>>>>> typescript-front/production
      <Route path="*" element={<NotFound />} />
    </>
  )
);

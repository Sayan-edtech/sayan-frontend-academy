import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NotFound from "@/pages/not-found";
import CourseDetails from "@/pages/courses/[slug]";
import { academyAuthRoutes } from "./AuthRoutes";
import Home from "@/pages";
import Layout from "@/components/shared/Layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="courses/:courseSlug" element={<CourseDetails />} />
        {academyAuthRoutes}
      </Route>

      <Route path="*" element={<NotFound />} />
    </>
  )
);

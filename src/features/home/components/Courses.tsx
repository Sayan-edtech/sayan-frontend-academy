// import CourseCard from "@/components/shared/CourseCard";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
// import { useParams } from "react-router-dom";

function Courses() {
  return (
    <section id="courses" className="py-16">
      <div className="container">
        {/* Header */}
        <h2 className="text-2xl text-center lg:text-3xl font-bold pb-8 text-primary">
          كل المواد التدريبية
        </h2>

        <CoursesList />
      </div>
    </section>
  );
}

export default Courses;

function CoursesList() {
  // const { academySlug } = useParams();
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-courses",
          prevEl: ".swiper-button-prev-courses",
        }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="!pb-4 !px-1 courses-swiper"
      >
        {/* <ul>
          {courses.map((course) => (
            <SwiperSlide key={course.id} className="h-full">
              <li className="bg-card shadow-sm hover:shadow-md transition-colors duration-200 rounded-[20px] p-4">
                <CourseCard
                  course={course}
                  href={`/academy/${academySlug}/courses/${course.slug}`}
                />
              </li>
            </SwiperSlide>
          ))}
        </ul> */}
      </Swiper>

      {/* Custom Navigation Buttons - Outside */}
      <div className="swiper-button-prev-courses absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      <div className="swiper-button-next-courses absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}

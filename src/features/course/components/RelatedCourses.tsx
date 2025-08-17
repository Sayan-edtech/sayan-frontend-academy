import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import CourseCard from "@/components/shared/CourseCard";

export default function RelatedCourses() {
  return (
    <div className="container">
      <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
        مواد تعليمية مناسبة لك
      </h3>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        slidesPerView="auto"
        breakpoints={{
          640: {
            slidesPerView: "auto",
          },
          1024: {
            slidesPerView: "auto",
          },
        }}
        className="!pb-4 !px-1"
      >
        <ul>
          {/* {relatedCourses.map((course) => (
            <SwiperSlide key={course.id} className="h-full">
              <CourseCard course={course} />
            </SwiperSlide>
          ))} */}
        </ul>
      </Swiper>
    </div>
  );
}

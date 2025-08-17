import CourseHeader from "./CourseHeader";
import CourseVideo from "./CourseVideo";
import CourseTabs from "./CourseTabs";
import CourseSidebar from "./CourseSidebar";
import MobileFloatingSection from "./MobileFloatingSection";

interface Course {
  id: number;
  title: string;
  rating: number;
  totalReviews?: number;
  price: number;
  duration: string;
  lessonsCount: number;
  enrolledStudents: number;
  videoUrl: string;
  description: string;
  image: string;
  instructor: {
    name: string;
    image: string;
    bio?: string;
    rating?: number;
    students?: number;
    courses?: number;
  };
  type: string;
  category: string;
  slug: string;
  insteadOf?: number;
  level: string;
  learningPoints?: string[];
  curriculum?: {
    title: string;
    lessons: number;
    duration: string;
    content: string[];
  }[];
  reviews?: {
    name: string;
    avatar: string;
    rating: number;
    comment: string;
  }[];
}

function Hero({ courseData }: { courseData: Course }) {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-50">
        <div className="container mx-auto py-3 md:py-6 lg:py-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <CourseHeader courseData={courseData} />
              <CourseVideo courseData={courseData} />
              <CourseTabs courseData={courseData} />
            </div>

            <CourseSidebar courseData={courseData} />
          </div>
        </div>
      </section>

      <MobileFloatingSection courseData={courseData} />
    </div>
  );
}

export default Hero;

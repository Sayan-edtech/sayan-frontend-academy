import CoursePricingCard from "./CoursePricingCard";
import AcademyCard from "./AcademyCard";

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

interface CourseSidebarProps {
  courseData: Course;
}

export default function CourseSidebar({ courseData }: CourseSidebarProps) {
  return (
    <div className="hidden lg:block lg:col-span-1">
      <div className="sticky top-6 space-y-6">
        <CoursePricingCard courseData={courseData} />
        <AcademyCard
          academy={{
            name: "أكاديمية إبداع",
            image: "/assets/images/logo.svg",
            slug: "ebdaa-academy",
          }}
        />
      </div>
    </div>
  );
}

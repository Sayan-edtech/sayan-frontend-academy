import { Star, Users } from "lucide-react";

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

interface CourseHeaderProps {
  courseData: Course;
}

export default function CourseHeader({ courseData }: CourseHeaderProps) {
  return (
    <div className="mb-4 md:mb-6">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {courseData.title}
      </h1>

      {/* Stats Row */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(courseData.rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="font-semibold text-gray-900">
            {courseData.rating}
          </span>
          <span>({courseData.totalReviews || 0} تقييم)</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{courseData.enrolledStudents.toLocaleString()} طالب مسجل</span>
        </div>
      </div>
    </div>
  );
}

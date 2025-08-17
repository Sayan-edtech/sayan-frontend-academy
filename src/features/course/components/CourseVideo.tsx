import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Course {
  videoUrl: string;
  image: string;
}

interface CourseVideoProps {
  courseData: Course;
}

export default function CourseVideo({ courseData }: CourseVideoProps) {
  return (
    <Card className="overflow-hidden mb-4 md:mb-6 border border-gray-200 bg-white">
      <div className="aspect-video bg-black relative group">
        <video
          src={courseData.videoUrl}
          className="w-full h-full object-cover"
          controls
          poster={courseData.image}
          controlsList="nodownload"
          playsInline
        />
        {/* Custom Play Button Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
          </div>
        </div>
        {/* Preview Badge */}
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
          فيديو تعريفي
        </div>
        {/* Mobile-friendly touch area */}
        <div className="absolute inset-0 md:hidden"></div>
      </div>
    </Card>
  );
}

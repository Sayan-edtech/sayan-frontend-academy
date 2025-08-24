import { Link } from "react-router-dom";
import { ArrowRight, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Chapter } from "@/types/lesson";

interface CourseHeaderProps {
  chapters: Chapter[];
}

export function CourseHeader({ chapters }: CourseHeaderProps) {
  const totalLessons = chapters.reduce(
    (acc, chapter) => acc + chapter.lessons.length,
    0
  );
  const completedLessons = chapters.reduce((acc, chapter) => {
    return acc + chapter.lessons.filter((lesson) => lesson.isCompleted).length;
  }, 0);
  const completionPercentage =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Video className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            أساسيات تطوير الويب
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1 min-w-[180px]">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600">
              {completionPercentage}% مكتمل
            </div>
            <div className="text-xs text-gray-500">
              {completedLessons} من {totalLessons} دروس
            </div>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        <Link to="/dashboard/ai-learning-materials">
          <Button>
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للمواد التعليمية
          </Button>
        </Link>
      </div>
    </div>
  );
}

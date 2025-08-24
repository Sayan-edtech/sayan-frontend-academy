import {
  BookOpen,
  Video,
  ClipboardCheck,
  Zap,
  CheckCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Chapter, Lesson } from "@/types/lesson";

interface LessonsListProps {
  chapters: Chapter[];
  onToggleChapter: (chapterId: string) => void;
  onSelectLesson: (lessonId: string) => void;
}

export function LessonsList({
  chapters,
  onToggleChapter,
  onSelectLesson,
}: LessonsListProps) {
  const getLessonIcon = (type: Lesson["type"]) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4 text-red-500" />;
      case "quiz":
        return <ClipboardCheck className="w-4 h-4 text-blue-500" />;
      case "interactive":
        return <Zap className="w-4 h-4 text-purple-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl lg:p-4 lg:shadow-sm lg:border-0 h-full">
      <div className="hidden lg:flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900 text-right">قائمة الدروس</h3>
      </div>

      <ScrollArea className="h-full lg:h-[calc(100%-60px)]">
        <div className="space-y-2 p-4 lg:p-0">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="space-y-2">
              <button
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                onClick={() => onToggleChapter(chapter.id)}
              >
                <div className="flex items-center gap-2">
                  {chapter.isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <Badge
                    variant="secondary"
                    className="text-xs bg-blue-100 text-blue-800 border-blue-200"
                  >
                    {chapter.progress}%
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 text-sm">
                    {chapter.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {chapter.lessons.length} دروس
                  </div>
                </div>
              </button>

              {chapter.isExpanded && (
                <div className="mr-6 space-y-1">
                  {chapter.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-right transition-colors border ${
                        lesson.isActive
                          ? "bg-blue-50 border-blue-200 shadow-sm"
                          : "hover:bg-gray-50 border-gray-100"
                      }`}
                      onClick={() => onSelectLesson(lesson.id)}
                    >
                      <div className="flex items-center gap-2">
                        {lesson.isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`text-sm font-medium ${
                            lesson.isActive ? "text-blue-900" : "text-gray-900"
                          }`}
                        >
                          {lesson.title}
                        </div>
                        {getLessonIcon(lesson.type)}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

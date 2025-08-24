import type { Chapter } from "@/types/lesson";
import { LessonsList } from "./LessonsList";

interface MobileLessonsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  onToggleChapter: (chapterId: string) => void;
  onSelectLesson: (lessonId: string) => void;
}

export function MobileLessonsDropdown({
  isOpen,
  onClose,
  chapters,
  onToggleChapter,
  onSelectLesson,
}: MobileLessonsDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden absolute top-[138px] left-0 right-0 z-50 p-4">
      <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose} />
      <div className="relative z-50 bg-white shadow-2xl rounded-xl border border-gray-200">
        <div className="max-h-[60vh] overflow-hidden">
          <div className="p-2">
            <LessonsList
              chapters={chapters}
              onToggleChapter={onToggleChapter}
              onSelectLesson={onSelectLesson}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

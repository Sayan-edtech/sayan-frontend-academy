import { useState } from "react";
import { MobileLessonsDropdown } from "@/features/dashboard/ai-learning-materials/components/lesson/MobileLessonsDropdown";
import { LessonsList } from "@/features/dashboard/ai-learning-materials/components/lesson/LessonsList";
import { LessonContent } from "@/features/dashboard/ai-learning-materials/components/lesson/LessonContent";
import { CourseHeader } from "@/features/dashboard/ai-learning-materials/components/CourseHeader";
import type { Chapter } from "@/types/lesson";

// eslint-disable-next-line react-refresh/only-export-components
export const chaptersData: Chapter[] = [
  {
    id: "ch1",
    title: "أساسيات HTML",
    isExpanded: true,
    progress: 67,
    lessons: [
      {
        id: "l1-1",
        title: "مقدمة HTML",
        type: "video",
        duration: "12 دقيقة",
        isCompleted: true,
        isActive: false,
      },
      {
        id: "l1-2",
        title: "تطبيق HTML",
        type: "interactive",
        duration: "15 دقيقة",
        isCompleted: false,
        isActive: false,
      },
      {
        id: "l1-3",
        title: "اختبار HTML",
        type: "quiz",
        duration: "10 دقائق",
        isCompleted: false,
        isActive: false,
      },
    ],
  },
  {
    id: "ch2",
    title: "CSS الأساسي",
    isExpanded: true,
    progress: 50,
    lessons: [
      {
        id: "l2-1",
        title: "شرح CSS",
        type: "video",
        duration: "15 دقيقة",
        isCompleted: true,
        isActive: true,
      },
      {
        id: "l2-2",
        title: "تطبيق CSS",
        type: "interactive",
        duration: "18 دقيقة",
        isCompleted: false,
        isActive: false,
      },
    ],
  },
  {
    id: "ch3",
    title: "JavaScript البسيط",
    isExpanded: false,
    progress: 0,
    lessons: [
      {
        id: "l3-1",
        title: "مبادئ JavaScript",
        type: "video",
        duration: "20 دقيقة",
        isCompleted: false,
        isActive: false,
      },
      {
        id: "l3-2",
        title: "مشروع بسيط",
        type: "interactive",
        duration: "22 دقيقة",
        isCompleted: false,
        isActive: false,
      },
    ],
  },
];

// المكون الرئيسي
export default function ComprehensiveWebDevelopment() {
  const [chapters, setChapters] = useState(chaptersData);
  const [activeLessonId, setActiveLessonId] = useState<string | null>("l2-1");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleChapter = (chapterId: string) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isExpanded: !chapter.isExpanded }
          : chapter
      )
    );
  };

  const handleSelectLesson = (lessonId: string) => {
    setChapters((prev) =>
      prev.map((chapter) => ({
        ...chapter,
        lessons: chapter.lessons.map((lesson) => ({
          ...lesson,
          isActive: lesson.id === lessonId,
        })),
      }))
    );
    setActiveLessonId(lessonId);
    setIsMobileMenuOpen(false); // إغلاق القائمة في الجوال عند اختيار درس
  };

  return (
    <div className="bg-gray-50 min-h-screen relative" dir="rtl">
      <div className="flex flex-col h-screen">
        <CourseHeader chapters={chapters} />

        <div className="flex-1 py-4 lg:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-20 gap-6 h-full">
            {/* قائمة الدروس - مخفية في الجوال */}
            <div className="hidden lg:block lg:col-span-4">
              <LessonsList
                chapters={chapters}
                onToggleChapter={handleToggleChapter}
                onSelectLesson={handleSelectLesson}
              />
            </div>

            {/* محتوى الدرس */}
            <div className="col-span-1 lg:col-span-16">
              <LessonContent
                activeLessonId={activeLessonId}
                chapters={chapters}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            </div>
          </div>
        </div>

        {/* قائمة الدروس المنسدلة للجوال */}
        <MobileLessonsDropdown
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          chapters={chapters}
          onToggleChapter={handleToggleChapter}
          onSelectLesson={handleSelectLesson}
        />
      </div>
    </div>
  );
}

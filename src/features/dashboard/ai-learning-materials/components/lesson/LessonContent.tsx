import type { Chapter } from "@/types/lesson";
import { VideoLesson } from "./VideoLesson";
import { QuizLesson } from "./QuizLesson";
import { InteractiveLesson } from "./InteractiveLesson";
import { EmptyLessonState } from "./EmptyLessonState";

interface LessonContentProps {
  activeLessonId: string | null;
  chapters: Chapter[];
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function LessonContent({
  activeLessonId,
  chapters,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: LessonContentProps) {
  // العثور على الدرس النشط
  const activeLesson = chapters
    .flatMap((chapter) => chapter.lessons)
    .find((lesson) => lesson.id === activeLessonId);

  if (!activeLessonId || !activeLesson) {
    return (
      <EmptyLessonState
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    );
  }

  // عرض المكون المناسب حسب نوع الدرس
  switch (activeLesson.type) {
    case "video":
      return (
        <VideoLesson
          lesson={activeLesson}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      );

    case "quiz":
      return (
        <QuizLesson
          lesson={activeLesson}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      );

    case "interactive":
      return (
        <InteractiveLesson
          lesson={activeLesson}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      );

    default:
      return (
        <EmptyLessonState
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      );
  }
}

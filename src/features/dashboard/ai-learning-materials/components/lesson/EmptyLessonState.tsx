import { BookOpen } from "lucide-react";
import { MobileMenuButton } from "./MobileMenuButton";

interface EmptyLessonStateProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function EmptyLessonState({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: EmptyLessonStateProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border-0 h-full">
      <div className="p-4 lg:p-6 border-b">
        <div className="flex items-center justify-between">
          <MobileMenuButton
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <div className="flex items-center gap-2 text-right flex-1 lg:flex-none justify-end">
            <BookOpen className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">اختر درساً</h2>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2 text-right">
            اختر درساً
          </h3>
          <p className="text-gray-500 text-right">
            اختر درساً من القائمة لبدء التعلم
          </p>
        </div>
      </div>
    </div>
  );
}

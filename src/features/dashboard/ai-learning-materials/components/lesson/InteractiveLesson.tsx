import { Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lesson } from "@/types/lesson";
import { MobileMenuButton } from "./MobileMenuButton";

interface InteractiveLessonProps {
  lesson: Lesson;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function InteractiveLesson({
  lesson,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: InteractiveLessonProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border-0 h-full">
      <div className="p-4 lg:p-6 border-b">
        <div className="flex items-center justify-between">
          <MobileMenuButton
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <div className="flex items-center gap-2 text-right flex-1 lg:flex-none justify-end">
            <Zap className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              {lesson.title}
            </h2>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700 text-right">
              اكتب الكود:
            </h4>
            <textarea
              className="w-full h-64 p-4 bg-gray-900 text-green-400 font-mono text-sm rounded-xl resize-none border-0 shadow-sm"
              placeholder="<!-- اكتب كود HTML هنا -->"
              defaultValue={`<h1>مرحباً بالعالم</h1>
<p>هذا أول موقع لي</p>`}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700 text-right">النتيجة:</h4>
            <div className="w-full h-64 p-4 bg-gray-50 border border-gray-100 rounded-xl shadow-sm">
              <h1 className="text-xl font-bold mb-2 text-right">
                مرحباً بالعالم
              </h1>
              <p className="text-gray-700 text-right">هذا أول موقع لي</p>
            </div>
          </div>
        </div>

        <div className="flex justify-start mt-6">
          <Button className="bg-purple-600 hover:bg-purple-700 px-6">
            <CheckCircle className="w-4 h-4 ml-2" />
            إكمال التطبيق
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Play, Pause, CheckCircle, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Lesson } from "@/types/lesson";
import { AIAssistant } from "./AIAssistant";
import { MobileMenuButton } from "./MobileMenuButton";

interface VideoLessonProps {
  lesson: Lesson;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function VideoLesson({
  lesson,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: VideoLessonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border-0 h-full">
      <div className="p-4 lg:p-6 border-b">
        <div className="flex items-center justify-between">
          <MobileMenuButton
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <div className="flex items-center gap-2 text-right flex-1 lg:flex-none justify-end">
            <Video className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              {lesson.title}
            </h2>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-16 gap-6 h-[calc(100%-80px)]">
        {/* الفيديو */}
        <div className="lg:col-span-11 space-y-4">
          <div className="aspect-video bg-gray-900 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 transition-all"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black bg-opacity-50 rounded-lg p-3">
                <Progress value={30} className="h-2 mb-2" />
                <div className="flex justify-between text-white text-sm">
                  <span>04:30</span>
                  <span>{lesson.duration}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <Button className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 ml-2" />
              إكمال الدرس
            </Button>
          </div>
        </div>

        {/* المساعد الذكي */}
        <AIAssistant className="lg:col-span-5" />
      </div>
    </div>
  );
}

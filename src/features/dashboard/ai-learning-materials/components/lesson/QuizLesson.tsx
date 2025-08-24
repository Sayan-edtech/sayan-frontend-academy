import { useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lesson } from "@/types/lesson";
import { MobileMenuButton } from "./MobileMenuButton";

interface QuizLessonProps {
  lesson: Lesson;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: string;
}

const questions: Question[] = [
  {
    id: "q1",
    question: "ما هو الغرض من HTML؟",
    options: [
      "تنسيق الصفحات",
      "بناء هيكل الصفحات",
      "إضافة التفاعل",
      "إدارة البيانات",
    ],
    correct: "بناء هيكل الصفحات",
  },
  {
    id: "q2",
    question: "أي من هذه العناصر يستخدم للعنوان الرئيسي؟",
    options: ["<title>", "<h1>", "<header>", "<head>"],
    correct: "<h1>",
  },
];

export function QuizLesson({
  lesson,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: QuizLessonProps) {
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});

  return (
    <div className="bg-white rounded-xl shadow-sm border-0 h-full">
      <div className="p-4 lg:p-6 border-b">
        <div className="flex items-center justify-between">
          <MobileMenuButton
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <div className="flex items-center gap-2 text-right flex-1 lg:flex-none justify-end">
            <ClipboardCheck className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              {lesson.title}
            </h2>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-6 space-y-6">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className="border border-gray-100 rounded-xl p-4 lg:p-6 shadow-sm"
          >
            <h4 className="font-semibold text-gray-900 mb-4 text-right">
              السؤال {index + 1}: {q.question}
            </h4>
            <div className="space-y-3">
              {q.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <span className="text-right flex-1 font-medium text-gray-700">
                    {option}
                  </span>
                  <input
                    type="radio"
                    name={q.id}
                    value={option}
                    onChange={(e) =>
                      setUserAnswers({ ...userAnswers, [q.id]: e.target.value })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <Button
            className="bg-blue-600 hover:bg-blue-700 px-6"
            disabled={Object.keys(userAnswers).length < questions.length}
          >
            إرسال الإجابات
          </Button>
          <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
            {Object.keys(userAnswers).length} / {questions.length} مجاب
          </div>
        </div>
      </div>
    </div>
  );
}

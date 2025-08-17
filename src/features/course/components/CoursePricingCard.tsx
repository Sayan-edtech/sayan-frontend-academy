import {
  ShoppingCart,
  Heart,
  Share2,
  BookOpen,
  Play,
  Clock,
  Award,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Course {
  price: number;
  insteadOf?: number;
}

interface CoursePricingCardProps {
  courseData: Course;
}

export default function CoursePricingCard({
  courseData,
}: CoursePricingCardProps) {
  return (
    <Card className="border-gray-200 bg-white">
      <CardContent className="p-6">
        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            {courseData.insteadOf && (
              <span className="text-lg text-gray-400 line-through">
                {courseData.insteadOf} ريال
              </span>
            )}
            <span className="text-3xl font-bold text-blue-600">
              {courseData.price} ريال
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mb-6">
          <Button
            size="lg"
            className="flex-grow h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200"
          >
            <ShoppingCart className="w-5 h-5 ml-2" />
            اشترك في الدورة الآن
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 border-gray-200 hover:bg-gray-50 flex-shrink-0"
          >
            <Heart className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 border-gray-200 hover:bg-gray-50 flex-shrink-0"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Course Features */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-bold text-base mb-4 text-gray-900">
            معلومات الدورة
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: BookOpen, label: "مستوى مبتدئ" },
              { icon: Play, label: "3 دروس تعليمية" },
              { icon: Clock, label: "مشاهدة في أي وقت" },
              { icon: Award, label: "شهادة حضور" },
              { icon: MessageSquare, label: "معززة بالذكاء الاصطناعي" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-50 rounded-lg">
                  <feature.icon className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

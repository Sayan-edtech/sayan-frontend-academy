import { Star, CheckCircle, ChevronRight } from "lucide-react";

type TabId = "overview" | "curriculum" | "instructor" | "reviews";

interface Course {
  id: number;
  title: string;
  rating: number;
  totalReviews?: number;
  price: number;
  duration: string;
  lessonsCount: number;
  enrolledStudents: number;
  videoUrl: string;
  description: string;
  image: string;
  instructor: {
    name: string;
    image: string;
    bio?: string;
    rating?: number;
    students?: number;
    courses?: number;
  };
  type: string;
  category: string;
  slug: string;
  insteadOf?: number;
  level: string;
  learningPoints?: string[];
  curriculum?: {
    title: string;
    lessons: number;
    duration: string;
    content: string[];
  }[];
  reviews?: {
    name: string;
    avatar: string;
    rating: number;
    comment: string;
  }[];
}

interface CourseTabContentProps {
  courseData: Course;
  activeTab: TabId;
}

export default function CourseTabContent({
  courseData,
  activeTab,
}: CourseTabContentProps) {
  if (activeTab === "overview") {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            ماذا ستتعلم في هذه الدورة
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {(
              courseData.learningPoints || [
                "أساسيات المجال والمفاهيم الأساسية",
                "التطبيق العملي للمهارات المكتسبة",
                "أفضل الممارسات والأساليب المتقدمة",
                "مشاريع عملية تطبيقية",
              ]
            ).map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            متطلبات الدورة
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-blue-600 mt-1" />
              <span className="text-gray-700">
                لا توجد متطلبات مسبقة - مناسبة للمبتدئين
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-blue-600 mt-1" />
              <span className="text-gray-700">
                جهاز كمبيوتر أو هاتف ذكي للوصول للمحتوى
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-blue-600 mt-1" />
              <span className="text-gray-700">
                الرغبة في التعلم والتطبيق العملي
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (activeTab === "curriculum") {
    return (
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">محتوى الدورة</h3>
        <div className="space-y-3">
          {[
            { title: "المقدمة والأساسيات", lessons: 5 },
            { title: "المفاهيم المتقدمة", lessons: 8 },
            { title: "التطبيق العملي", lessons: 12 },
            { title: "المشاريع النهائية", lessons: 6 },
          ].map((section, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {section.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {section.lessons} دروس
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "instructor") {
    return (
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">
          ماذا سوف تتعلم
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "أساسيات التصميم والألوان",
              description:
                "تعلم مبادئ التصميم الأساسية واستخدام الألوان بشكل احترافي",
            },
            {
              title: "استخدام أدوات التصميم",
              description:
                "التعرف على أدوات التصميم المختلفة وكيفية استخدامها بكفاءة",
            },
            {
              title: "تصميم واجهات تفاعلية",
              description: "تصميم واجهات مستخدم جذابة وسهلة الاستخدام",
            },
            {
              title: "مبادئ تجربة المستخدم",
              description: "فهم احتياجات المستخدم وتصميم تجارب استخدام مميزة",
            },
            {
              title: "إنشاء نماذج أولية",
              description:
                "بناء نماذج أولية تفاعلية لاختبار التصميمات قبل التنفيذ",
            },
            {
              title: "تطبيق المشاريع العملية",
              description: "العمل على مشاريع واقعية لتطبيق المهارات المكتسبة",
            },
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "reviews") {
    return (
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">آراء الطلاب</h3>
        <div className="space-y-6">
          {[
            {
              name: "أحمد محمد",
              rating: 5,
              comment: "دورة ممتازة وشاملة، استفدت منها كثيراً",
            },
            {
              name: "فاطمة علي",
              rating: 5,
              comment: "المحتوى واضح والشرح مفصل، أنصح بها بشدة",
            },
            {
              name: "خالد السعد",
              rating: 4,
              comment: "دورة مفيدة جداً، ساعدتني في تطوير مهاراتي",
            },
          ].map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <img
                  src="/assets/images/default-avatar.jpg"
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="font-semibold text-gray-900">
                      {review.name}
                    </h5>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

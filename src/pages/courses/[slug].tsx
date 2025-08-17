import Hero from "../../features/course/components/Hero";
import RelatedCourses from "../../features/course/components/RelatedCourses";

export default function CourseDetails() {
  // const { slug } = useParams();
  const courseData = {
    id: 1,
    title: "تصميم واجهات المستخدم UI/UX",
    rating: 4.9,
    totalReviews: 328,
    price: 399,
    duration: "18 ساعة",
    lessonsCount: 45,
    enrolledStudents: 2850,
    videoUrl:
      "https://www.sayan-server.com/courses/videos/academy/1/1USaRw3xnc0Xgp8X3xbH.mp4",
    description:
      "تعلم تصميم واجهات المستخدم وتجربة المستخدم من الصفر حتى الاحتراف. احصل على المهارات اللازمة لتصميم تطبيقات ومواقع جذابة وسهلة الاستخدام.",
    image: "/assets/images/courses/ui-ux-design.jpg",
    instructor: {
      name: "أ. ليلى حسام",
      image: "/assets/images/instructors/instructor-ui.jpg",
      bio: "مصممة UI/UX محترفة مع أكثر من 10 سنوات من الخبرة في أفضل الشركات التقنية",
      rating: 4.8,
      students: 15500,
      courses: 12,
    },
    type: "مدفوع",
    category: "تصميم",
    slug: "ui-ux",
    insteadOf: 699,
    level: "من المبتدئ إلى المتقدم",
    learningPoints: [
      "أساسيات تصميم واجهات المستخدم",
      "مبادئ تجربة المستخدم",
      "استخدام أدوات التصميم الحديثة",
      "تصميم نماذج أولية تفاعلية",
      "اختبار وتحليل تجربة المستخدم",
      "التطبيق على مشاريع حقيقية",
    ],
    curriculum: [],
    reviews: [],
  };

  return (
    <main
      style={{
        background:
          "linear-gradient(156.58deg, rgba(15, 232, 232, 0.2) 17.14%, rgba(217, 217, 217, 0) 75.12%)",
      }}
      className="pt-44 pb-20"
    >
      <Hero courseData={courseData} />
      <RelatedCourses />
    </main>
  );
}

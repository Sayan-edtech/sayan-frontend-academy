import { Card, CardContent } from "@/components/ui/card";

interface Academy {
  name: string;
  image: string;
  slug: string;
}

interface AcademyCardProps {
  academy: Academy;
}

export default function AcademyCard({ academy }: AcademyCardProps) {
  return (
    <Card className="border-gray-200 bg-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={academy.image || "/assets/images/default-academy.png"}
              alt={academy.name}
              className="w-14 h-14 object-contain"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{academy.name}</h4>
            <a
              href={`/academy/${academy.slug}`}
              className="text-sm text-blue-600 hover:underline"
            >
              زيارة الأكاديمية
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

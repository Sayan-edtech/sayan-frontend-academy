import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface AddOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const addOptions: AddOption[] = [
  //   {
  //     id: "blog",
  //     title: "مدونة جديدة",
  //     description: "أنشئ مقال جديد لمشاركة المعرفة",
  //     icon: <FileText className="w-6 h-6" />,
  //     href: "/dashboard/blogs/new",
  //     color: "bg-blue-500 hover:bg-blue-600",
  //   },
  {
    id: "course",
    title: "دورة جديدة",
    description: "إنشاء دورة تدريبية شاملة",
    icon: <BookOpen className="w-6 h-6" />,
    href: "/dashboard/courses/new",
    color: "bg-green-500 hover:bg-green-600",
  },
  //   {
  //     id: "session",
  //     title: "جلسة مباشرة",
  //     description: "جدولة جلسة تدريبية مباشرة",
  //     icon: <Video className="w-6 h-6" />,
  //     href: "/dashboard/sessions/new",
  //     color: "bg-purple-500 hover:bg-purple-600",
  //   },
  //   {
  //     id: "digital-product",
  //     title: "منتج رقمي",
  //     description: "إضافة منتج رقمي للبيع",
  //     icon: <Package className="w-6 h-6" />,
  //     href: "/dashboard/digital-products/add",
  //     color: "bg-orange-500 hover:bg-orange-600",
  //   },
  //   {
  //     id: "product-bundle",
  //     title: "حزمة منتجات",
  //     description: "إنشاء حزمة من المنتجات المختلفة",
  //     icon: <Layers className="w-6 h-6" />,
  //     href: "/dashboard/product-bundles/new",
  //     color: "bg-indigo-500 hover:bg-indigo-600",
  //   },
];

export default function AddItemModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Plus className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            إضافة عنصر جديد
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {addOptions.map((option) => (
            <Link
              key={option.id}
              to={option.href}
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer">
                <div className={`p-3 rounded-lg text-white ${option.color}`}>
                  {option.icon}
                </div>
                <div className="flex-1 text-right">
                  <h3 className="font-medium text-gray-900">{option.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

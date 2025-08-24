import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Dot } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// بيانات وهمية للإشعارات
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "دورة جديدة متاحة",
    message: "تم إضافة دورة React المتقدمة إلى منصتك",
    time: "منذ 5 دقائق",
    read: false,
  },
  {
    id: "2",
    title: "تم إكمال التحميل",
    message: "تم تحميل الفيديو الجديد بنجاح",
    time: "منذ 15 دقيقة",
    read: false,
  },
  {
    id: "3",
    title: "طالب جديد مسجل",
    message: "انضم طالب جديد إلى دورة JavaScript الأساسية",
    time: "منذ 30 دقيقة",
    read: true,
  },
  {
    id: "4",
    title: "موعد استشارة قريب",
    message: "لديك موعد استشارة بعد ساعة واحدة",
    time: "منذ ساعة",
    read: false,
  },
  {
    id: "5",
    title: "تقييم جديد",
    message: "تم إضافة تقييم 5 نجوم لدورة CSS",
    time: "منذ ساعتين",
    read: true,
  },
];

export function NotificationsDropdown() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const allNotifications = notifications;
  const readNotifications = notifications.filter((n) => n.read);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const NotificationItem = ({
    notification,
  }: {
    notification: Notification;
  }) => (
    <div
      className={`p-4 hover:bg-gray-50/80 cursor-pointer transition-all duration-200 ${
        !notification.read ? "bg-blue-50/30" : ""
      }`}
      onClick={() => !notification.read && markAsRead(notification.id)}
      dir="rtl"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0 text-right">
          <h4
            className={`text-sm mb-1.5 text-right ${
              !notification.read
                ? "font-semibold text-gray-900"
                : "font-medium text-gray-700"
            }`}
          >
            {notification.title}
          </h4>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2 text-right leading-relaxed">
            {notification.message}
          </p>
          <span className="text-xs text-gray-500 text-right block">
            {notification.time}
          </span>
        </div>
        {!notification.read && (
          <Dot className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
        )}
      </div>
    </div>
  );

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0 shadow-lg" align="start">
        {/* هيدر الإشعارات */}
        <div className="p-4 bg-white" dir="rtl">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">الإشعارات</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-blue-600 hover:text-blue-700 text-xs h-auto p-1 hover:bg-blue-50 rounded-lg"
              >
                تعيين الكل كمقروء
              </Button>
            )}
          </div>
        </div>

        {/* التبويبات */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList
            className="grid w-full grid-cols-2 m-0 rounded-none bg-gray-50/50 h-12"
            dir="rtl"
          >
            <TabsTrigger
              value="all"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              الكل ({allNotifications.length})
            </TabsTrigger>
            <TabsTrigger
              value="read"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              المقروء ({readNotifications.length})
            </TabsTrigger>
          </TabsList>

          {/* محتوى تبويب الكل */}
          <TabsContent value="all" className="max-h-96 overflow-y-auto m-0">
            {allNotifications.length > 0 ? (
              <div>
                {allNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400" dir="rtl">
                <Bell className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">لا توجد إشعارات</p>
              </div>
            )}
          </TabsContent>

          {/* محتوى تبويب المقروء */}
          <TabsContent value="read" className="max-h-96 overflow-y-auto m-0">
            {readNotifications.length > 0 ? (
              <div>
                {readNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400" dir="rtl">
                <Bell className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">لا توجد إشعارات مقروءة</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

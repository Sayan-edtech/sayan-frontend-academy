import { useLocation } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const links = [
  {
    id: crypto.randomUUID(),
    title: "الرئيسية",
    href: "#home",
  },
  {
    id: crypto.randomUUID(),
    title: "الانجازات",
    href: "#features",
  },
  {
    id: crypto.randomUUID(),
    title: "المواد التعليمية",
    href: "#courses",
  },
  {
    id: crypto.randomUUID(),
    title: "أراء الطلاب",
    href: "#testimonials",
  },
  {
    id: crypto.randomUUID(),
    title: "الأسئلة الشائعة",
    href: "#faq",
  },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              className={`${
                location.hash === link.href
                  ? "text-primary"
                  : "accent-foreground"
              } hover:text-primary duration-200 transition-colors cursor-pointer`}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

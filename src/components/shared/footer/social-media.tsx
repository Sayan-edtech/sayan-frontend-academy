import Icon from "@/components/shared/Icon";

function SocialMedia({
  links,
}: {
  links: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
}) {
  const items = [
    {
      href: links.youtube || "#",
      iconName: "youtube" as const,
    },
    {
      href: links.linkedin || "#",
      iconName: "linkedin" as const,
    },
    {
      href: links.instagram || "#",
      iconName: "instagram" as const,
    },
    {
      href: links.twitter || "#",
      iconName: "twitter" as const,
    },
    {
      href: links.facebook || "#",
      iconName: "facebook" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-foreground text-lg">تابعنا على وسائل التواصل</h3>
      <ul className="flex items-center flex-wrap gap-4">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              target="_blank"
              className="bg-[#1E02AA] hover:bg-[#009AFF] duration-200 transition-colors rounded-[8px] w-10  h-10 element-center"
            >
              <Icon
                name={item.iconName}
                size="20"
                className="w-5 h-5 text-white"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SocialMedia;

import { NavLinks } from "@/types/navlink";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  item: NavLinks;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onClick }) => {
  const path = usePathname();
  const itemLabelToPath = `/${item.label_en
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  // Check if current locale is Arabic
  const pathSegments = path.split("/").filter(Boolean);
  const currentLocale = pathSegments[0] === "ar" ? "ar" : "en";
  const isArabic = currentLocale === "ar";

  clsx(
    "py-3 text-3xl sm:text-5xl font-medium text-white/40 rounded-full group-hover:text-primary",
    {
      "!text-primary": item.href === path,
      "text-primary": path.startsWith(itemLabelToPath),
    }
  );

  clsx("w-0 h-0.5 bg-primary transition-all duration-300", {
    "!block w-6 mr-4": item.href === path && !isArabic,
    "!block w-6 ml-4": item.href === path && isArabic,
    "block w-6": path.startsWith(itemLabelToPath) && !isArabic,
    "block w-6 ml-4": path.startsWith(itemLabelToPath) && isArabic,
    "group-hover:block group-hover:w-6 group-hover:mr-4": !isArabic,
    "group-hover:block group-hover:w-6 group-hover:ml-4": isArabic,
  });

  return (
    <li
      className={`flex items-center group w-fit ${
        isArabic ? "flex-row-reverse" : ""
      }`}
    >
      <div className="mostafa" />
      <Link href={item.href} className="headerlinks" onClick={onClick}>
        {isArabic ? item.label_ar : item.label_en}
      </Link>
    </li>
  );
};

export default NavLink;

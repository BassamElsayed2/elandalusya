"use client";
import { navLinks } from "@/app/api/navlink";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import NavLink from "./Navigation/NavLink";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Header: React.FC = () => {
  const t = useTranslations("Header");
  const [sticky, setSticky] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const sideMenuRef = useRef<HTMLDivElement>(null);

  // Get current locale from pathname - handle both /en and /ar paths
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentLocale = pathSegments[0] === "ar" ? "ar" : "en";
  const isArabic = currentLocale === "ar";

  const handleLanguageChange = () => {
    const newLocale = isArabic ? "en" : "ar";
    // Remove current locale from path and add new one
    const pathWithoutLocale = pathSegments.slice(1).join("/");
    const newPath = `/${newLocale}${
      pathWithoutLocale ? `/${pathWithoutLocale}` : ""
    }`;
    router.push(newPath);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sideMenuRef.current &&
      !sideMenuRef.current.contains(event.target as Node)
    ) {
      setNavbarOpen(false);
    }
  };

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleScroll]);

  const isHomepage = pathname === "/en" || pathname === "/ar";

  return (
    <header
      className={`fixed h-24 py-1 z-50 w-full bg-transparent transition-all duration-300 lg:px-0 px-4 ${
        sticky ? "top-3" : "top-0"
      }`}
    >
      <nav
        className={`container mx-auto max-w-8xl flex items-center justify-between py-4 duration-300 ${
          sticky
            ? "shadow-lg bg-white dark:bg-dark rounded-full top-5 px-4 "
            : "shadow-none top-0"
        }`}
      >
        <div className="headerlogo flex justify-between items-center gap-2 w-full">
          <div>
            <Link href={`/${currentLocale}`}>
              <Image
                src={"/images/header/logo2.png"}
                alt="logo"
                width={192}
                height={66}
                unoptimized={true}
                className={`${
                  isHomepage
                    ? sticky
                      ? "block dark:hidden"
                      : "hidden"
                    : sticky
                    ? "block dark:hidden"
                    : "block dark:hidden"
                }`}
              />
              <Image
                src={"/images/header/logo2.png"}
                alt="logo"
                width={192}
                height={66}
                unoptimized={true}
                className={`${
                  isHomepage
                    ? sticky
                      ? "hidden dark:block"
                      : "block"
                    : sticky
                    ? "dark:block hidden"
                    : "dark:block hidden"
                }`}
              />
            </Link>
          </div>
          <div
            className={`flex items-center gap-2 sm:gap-6 ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            {/* Language Switcher */}
            <button
              onClick={handleLanguageChange}
              className={`px-3 py-2 rounded-full text-sm font-medium border transition-colors ${
                isHomepage
                  ? sticky
                    ? "text-dark dark:text-white border-dark dark:border-white hover:bg-dark hover:text-white dark:hover:bg-white dark:hover:text-dark"
                    : "text-white border-white hover:bg-white hover:text-dark"
                  : "text-dark dark:text-white border-dark dark:border-white hover:bg-dark hover:text-white dark:hover:bg-white dark:hover:text-dark"
              }`}
            >
              {isArabic ? "EN" : "AR "}
            </button>

            <div
              className={`hidden md:block ${
                isArabic ? "border-l border-r-0 pr-0 pl-6" : "border-r pr-6"
              }`}
            >
              <Link
                href="#"
                className={`text-base text-inherit flex items-center gap-2 ${
                  isHomepage
                    ? sticky
                      ? "text-dark dark:text-white hover:text-primary border-dark dark:border-white"
                      : "text-white hover:text-primary"
                    : "text-dark hover:text-primary"
                }`}
              >
                <Icon icon={"ph:phone-bold"} width={24} height={24} />
                01553841793
              </Link>
            </div>
            <div>
              <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className={`headermenu flex items-center gap-3 p-2 sm:px-5 sm:py-3 rounded-full font-semibold hover:cursor-pointer border ${
                  isHomepage
                    ? sticky
                      ? "text-white bg-dark dark:bg-white dark:text-dark dark:hover:text-white dark:hover:bg-dark hover:text-dark hover:bg-white border-dark dark:border-white"
                      : "text-dark bg-white dark:text-dark hover:bg-transparent hover:text-white border-white"
                    : "bg-dark text-white hover:bg-transparent hover:text-dark dark:bg-white dark:text-dark dark:hover:bg-transparent dark:hover:text-white duration-300"
                }`}
                aria-label="Toggle mobile menu"
              >
                <span>
                  <Icon icon={"ph:list"} width={24} height={24} />
                </span>
                <span className="hidden sm:block">{t("menu")}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {navbarOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40" />
      )}

      <div
        ref={sideMenuRef}
        className={`fixed top-0 ${
          isArabic ? "left-0" : "right-0"
        } h-full w-full bg-dark shadow-lg transition-transform duration-300 max-w-2xl ${
          navbarOpen
            ? "translate-x-0"
            : isArabic
            ? "-translate-x-full"
            : "translate-x-full"
        } z-50 px-20 overflow-auto no-scrollbar`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="">
            <div className="flex items-center justify-start py-10">
              <button
                onClick={() => setNavbarOpen(false)}
                aria-label="Close mobile menu"
                className="bg-white p-3 rounded-full hover:cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col items-start gap-4">
              <ul className="w-full">
                {navLinks.map((item, index) => (
                  <NavLink
                    key={index}
                    item={item}
                    onClick={() => setNavbarOpen(false)}
                  />
                ))}
                {/* <li className='flex items-center gap-4'>
                  <Link href="/signin" className='py-4 px-8 bg-primary text-base leading-4 block w-fit text-white rounded-full border border-primary font-semibold mt-3 hover:bg-transparent hover:text-primary duration-300'>
                    Sign In
                  </Link>
                  <Link href="/" className='py-4 px-8 bg-transparent border border-primary text-base leading-4 block w-fit text-primary rounded-full font-semibold mt-3 hover:bg-primary hover:text-white duration-300'>
                    Sign up
                  </Link>
                </li> */}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-1 my-16 text-white">
            <p className="text-base sm:text-xm font-normal text-white/40">
              Contact
            </p>
            <Link
              href="#"
              className="text-base sm:text-xm font-medium text-inherit hover:text-primary"
            >
              hello@homely.com
            </Link>
            <Link
              href="#"
              className="text-base sm:text-xm font-medium text-inherit hover:text-primary"
            >
              +1-212-456-7890{" "}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

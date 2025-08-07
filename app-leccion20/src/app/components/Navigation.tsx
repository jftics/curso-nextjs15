"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
//import Link from "next/link";
import { Link } from "@/i18n/navigation";

export default function Navigation() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    // Remover el idioma actual del path
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    // Navegar a la nueva URL con el nuevo idioma
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const languages = [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            {/* <Link href={`/${locale}`}>App i18n</Link>

            <div className="md:flex space-x-6">
              <Link
                href={`/${locale}`}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t("navigation.home")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t("navigation.about")}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t("navigation.contact")}
              </Link>
            </div> */}

            <Link href="/">App i18n</Link>

            <div className="md:flex space-x-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t("navigation.home")}
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t("navigation.about")}
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t("navigation.contact")}
              </Link>
            </div>
          </div>

          {/* Selector de idiomas */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {t("currentLanguage", { locale: locale.toLocaleUpperCase() })}
            </span>

            <select
              value={locale}
              onChange={(e) => changeLanguage(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} {lang.flag}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}

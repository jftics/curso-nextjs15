import { useTranslations } from "next-intl";
import LanguageDemo from "../components/LenguageDemo";
export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("title")}</h1>
        <p className="text-xl text-gray-600 mb-6">{t("subtitle")}</p>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      <LanguageDemo></LanguageDemo>
    </div>
  );
}

import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("title")}</h1>
        <p className="text-xl text-gray-600">{t("content")}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t("team")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <h3 className="font-semibold text-gray-800">John Doe</h3>
            <p className="text-gray-600">Frontend Developer</p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              JS
            </div>
            <h3 className="font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-gray-600">Backend Developer</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            {t("mission")}
          </h3>
        </div>
      </div>
    </div>
  );
}

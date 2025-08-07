import { useTranslations } from "next-intl";
import ContactForm from "@/app/components/ContactForm";
export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("title")}</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <ContactForm></ContactForm>
      </div>
    </div>
  );
}

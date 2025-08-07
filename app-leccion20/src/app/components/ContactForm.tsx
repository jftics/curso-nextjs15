"use client";

import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("ContactPage.form");

  return (
    <form className="space-y-6">
      {/* Campo Nombre */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t("name")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder={t("placeholder.name")}
        ></input>
      </div>

      {/* Campo Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t("email")} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={t("placeholder.email")}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
        />
      </div>

      {/* Campo Mensaje */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t("message")} *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t("placeholder.message")}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
        />
      </div>

      {/* Botón de envío */}
      <div>
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-md font-medium transition-colors bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 text-white"
        >
          {t("send")}
        </button>
      </div>
    </form>
  );
}

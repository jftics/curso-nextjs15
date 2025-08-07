"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

export default function LanguageDemo() {
  const locale = useLocale();
  const [count, setCount] = useState(5);

  // Formateo de números según el idioma
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(locale).format(num); //'es' 'en'
  };

  // Formateo de fechas según el idioma
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }).format(date);
  };

  // Formateo de moneda según el idioma
  const formatCurrency = (amount: number) => {
    const currencyCode =
      locale === "es" ? "EUR" : locale === "en" ? "USD" : "EUR";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  };

  // Pluralización (ejemplo básico)
  const getPluralMessage = (count: number) => {
    if (locale === "es") {
      return count === 1 ? `${count} elemento` : `${count} elementos`;
    } else if (locale === "en") {
      return count === 1 ? `${count} item` : `${count} items`;
    } else {
      return count === 1 ? `${count} élément` : `${count} éléments`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        🌐 Demostración de Características i18n
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Formateo de números */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">
            📊 Formateo de Números
          </h3>
          <div className="bg-gray-50 p-3 rounded">
            <p>
              <strong>Número:</strong> {formatNumber(1234567.89)}
            </p>
            <p>
              <strong>Grande:</strong> {formatNumber(999999999)}
            </p>
          </div>
        </div>

        {/* Formateo de fechas */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">
            📅 Formateo de Fechas
          </h3>

          <div className="bg-gray-50 p-3 rounded">
            <p>
              <strong>Hoy:</strong> {formatDate(new Date())}
            </p>
            <p>
              <strong>Año nuevo:</strong> {formatDate(new Date("2025-01-01"))}
            </p>
          </div>
        </div>

        {/* Formateo de moneda */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">
            💰 Formateo de Moneda
          </h3>

          <div className="bg-gray-50 p-3 rounded">
            <p>
              <strong>Precio:</strong> {formatCurrency(29.99)}
            </p>
            <p>
              <strong>Total:</strong> {formatCurrency(1599.5)}
            </p>
          </div>
        </div>

        {/* Pluralización */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">
            🔢 Pluralización
          </h3>
          <div className="bg-gray-50 p-3 rounded">
            <div className="flex items-center space-x-2 mb-2">
              <button
                onClick={() => setCount(Math.max(0, count - 1))}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                -
              </button>
              <span className="font-mono text-lg">{count}</span>
              <button
                onClick={() => setCount(count + 1)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +
              </button>
            </div>

            <p>
              <strong>Resultado:</strong> {getPluralMessage(count)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

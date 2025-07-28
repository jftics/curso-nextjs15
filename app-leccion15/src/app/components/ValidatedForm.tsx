"use client";

import { useState, FormEvent } from "react";
import { z } from "zod";

// Esquema de validación con Zod
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  age: z
    .number()
    .min(18, "Debes ser mayor de 18 años")
    .max(120, "Por favor ingresa una edad válida"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje no puede tener más de 500 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

// Tipo para errores de validación
type ValidationErrors = Partial<Record<keyof ContactForm, string>>;
//algo como esto
// {
//   name?: string;
//   email?: string;
//   age?: string;
//   message?: string;
// }

export default function ValidatedForm() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    age: 18,
    message: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: keyof ContactForm, value: string | number) => {
    try {
      // Validar solo el campo específico
      const fieldSchema = contactSchema.shape[field];
      fieldSchema.parse(value);

      // Si es válido, quitar el error
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [field]: error.errors[0].message,
        }));
      }
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseInt(value) || 0 : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    // Validar el campo cuando cambia
    validateField(name as keyof ContactForm, parsedValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validar todo el formulario
      const validatedData = contactSchema.parse(formData);

      // Limpiar errores si la validación es exitosa
      setErrors({});

      // Simular envío al servidor
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Datos validados enviados:", validatedData);

      // Limpiar formulario
      setFormData({ name: "", email: "", age: 18, message: "" });
      alert("¡Formulario enviado exitosamente!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convertir errores de Zod a nuestro formato
        const validationErrors: ValidationErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            validationErrors[err.path[0] as keyof ContactForm] = err.message;
          }
        });
        setErrors(validationErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Formulario con Validación</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          ></input>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Edad *
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="18"
            max="120"
            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.age
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Mensaje *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.message
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {formData.message.length}/500 caracteres
          </p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

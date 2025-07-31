import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    // Dominios externos permitidos
    domains:['example.com', 'picsum.photos'],
    // Formatos soportados (Next.js 15 incluye AVIF por defecto)
    formats: ['image/avif', 'image/webp'],
    // Tamaños de dispositivo para responsive
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Tamaños de imagen para diferentes breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
    
  }
};

export default nextConfig;

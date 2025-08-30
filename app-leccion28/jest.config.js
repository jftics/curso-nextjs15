const nextJest = require('next/jest')

//Aquí le dices a Next dónde está tu aplicación. ene ste caso significa que la raíz de tu proyecto está en el mismo nivel que este archivo de configuración
const createJestConfig = nextJest({
  // Ruta a tu aplicación Next.js
  dir: './',
})

// Configuración personalizada de Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom', //Le dice a Jest que simule un navegador con jsdom
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',//analiza todos los archivos fuente JS/TS/TSX.
    '!src/**/*.d.ts', // ignora los archivos de definición de TypeScript
  ], 
}

module.exports = createJestConfig(customJestConfig)
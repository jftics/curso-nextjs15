import {test, expect} from "@playwright/test"

test.describe("Users Page",()=>{
    test("muestra la lista de usuarios correctamente",async ({page})=>{
        await page.goto('/users')
        // Esperamos que el título aparezca
        await expect(page.locator('h1')).toHaveText('Usuarios')
        // Verificamos que se muestren los usuarios
        await expect(page.locator('[data-testid="user-card"]')).toHaveCount(2)
        // Verificamos contenido específico
        //await expect(page.locator('text=Juan').nth(0)).toBeVisible()
        await expect(page.locator('[data-testid="user-card"]:has-text("Juan")')).toBeVisible()
        
        await expect(page.getByRole('heading', { name: 'Juan' })).toBeVisible();
        await expect(page.getByText('Juan', { exact: true })).toBeVisible(); 
    })
    test('el botón agregar usuario es interactivo', async ({ page }) => {
        await page.goto('/users')
        
        const button = page.locator('text=Agregar Usuario')
        await expect(button).toBeVisible()
        
        // El botón debe ser clickeable
        await expect(button).toBeEnabled()
    })
    test('navegación funciona correctamente', async ({ page }) => {
        await page.goto('/')
        
        // Click en link hacia users
        await page.click('text=Usuarios')
        
        await expect(page).toHaveURL('/users')
        await expect(page.locator('h1')).toHaveText('Usuarios')
    })
})
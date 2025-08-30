import {GET, POST} from '@/app/api/users/route'

function createMockRequest(method: string, body?:any):Request{
    const url = 'http://localhost:3000/api/users'
    const options : RequestInit= {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body? JSON.stringify(body): undefined
    }

    return new Request(url, options)
}

jest.mock("next/server",()=>{
    return{
        NextResponse:{
            json: jest.fn((data,init)=>{
                const status = init?.status ?? 200
                return{
                    ok: status>=200 && status <300,
                    status,
                    json: async()=> data
                }
            })
        }
    }
})

describe('/api/users',()=>{
    describe('GET',()=>{
        it('retorna la lista de usuarios', async()=>{
            const response = await GET();
            const data = await response.json();

            expect(response.status).toBe(200)
            expect(data.success).toBe(true)
            expect(data.users).toHaveLength(2)
            expect(data.users[0]).toHaveProperty('name','Juan')
        })
    })
    describe('POST',()=>{
        it('crea un nuevo usuario correctamente',async ()=>{
            const newUser = { name: 'Carlos', email: 'carlos@example.com' }
            const response = await POST(createMockRequest('POST', newUser))
            const data = await response.json()

            expect(response.status).toBe(201)
            expect(data.success).toBe(true)
            expect(data.user.name).toBe('Carlos')
        })
        it('retorna error cuando faltan campos requeridos', async () => {
            const invalidUser = { name: 'Carlos' } // Falta email
            const request = createMockRequest('POST', invalidUser)
            
            const response = await POST(request)
            const data = await response.json()
            
            expect(response.status).toBe(400)
            expect(data.error).toBe('Name and email are required')
            })
    })
})
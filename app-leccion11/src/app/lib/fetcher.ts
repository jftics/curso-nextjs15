export const fetcher = (url:string)=>fetch(url).then(res=>{
    if(!res.ok){
        throw new Error('Error en la petición')
    }
    return res.json()
})
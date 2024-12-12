import { useEffect, useState } from "react"
import { fetchUsuarioById, fetchUsuariosByUsername } from "../lib/usuarios"


export default function Buscador(){
    const [usuario,setUsuario] = useState({})
    const [usuariosEncontrados,setUsuariosEncontrados] = useState([])

    const buscarUsuario = async () =>{
        const usuario = sessionStorage.getItem("usuario")
        if (usuario) {
            try {
                const response = await fetchUsuarioById(usuario)
                setUsuario(response)
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    const buscarUsuarios = async (buscador) =>{
        const dato = {
            username: buscador
        }
        try {
            const response = await fetchUsuariosByUsername(dato)
            console.log(response)
            setUsuariosEncontrados(response)
        } catch (error) {
            console.log(error.message)
        }
        
    }

    const handleChange = (event) =>{
        const dato = event.target.value
        if (dato != "") {
            buscarUsuarios(dato)
        }else{
            setUsuariosEncontrados([])
        }
        
    }
    useEffect(()=>{
         buscarUsuario()
    },[])
   

    return (
        
    <div className="p-8">

        <div className="justify-end flex items-center gap-4">
            <img src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" className="inline-block relative object-cover object-center !rounded-full w-12 h-12" />
            <div>
            <h6 className="text-slate-800 dark:text-gray-300 font-semibold">
                {usuario.username}
            </h6>
            <p className="text-slate-600 text-sm dark:text-gray-500">
                {usuario.nombre} {usuario.apellido}
            </p>
            </div>
        </div>

        <hr className="border-orange-400  my-4" />

        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input onChange={handleChange} type="search" id="default-search" className="focus:outline-none block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-orange-400 focus:border-orange-400 dark:bg-gray-800 dark:placeholder-gray-300 dark:text-white" placeholder="Search"/>
        </div>
        <div className="rounded overflow-hidden shadow-lg dark:bg-gray-800 bg-gray-200 mt-4">
            
            
            {usuariosEncontrados.map((usuario) => (
                
                <div key={usuario._id} className="justify-start flex items-center gap-4 pl-4 p-4 hover:bg-orange-400">
                    <img src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" className="inline-block relative object-cover object-center !rounded-full w-12 h-12" />
                    <div>
                    <h6 className="text-slate-800 dark:text-gray-300 font-semibold">
                        {usuario.username}
                    </h6>
                    <p className="text-slate-600 text-sm dark:text-gray-500">
                        {usuario.nombre} {usuario.apellido}
                    </p>
                    </div>
                </div>
                
                
            ))}
            
        </div>

    </div>
    


    )
}
import { useCallback, useEffect, useState } from "react"
import { fetchUsuarioById, fetchUsuariosByUsername, seguir, updateUsuario } from "../lib/usuarios"
import Link from "next/link"



export default function Buscador(){
    const [usuarioLoggeado,setUsuarioLoggueado] = useState({})
    const [usuariosEncontrados,setUsuariosEncontrados] = useState([])


    const buscarUsuario = async () =>{
        const usuario = sessionStorage.getItem("usuario")
        if (usuario) {
            try {
                const response = await fetchUsuarioById(usuario)
                setUsuarioLoggueado(response)
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
            setUsuariosEncontrados(response)
        } catch (error) {
            console.log(error.message)
        }
        
    }

    const dejarSeguirUsuario = async (seguido) =>{
        const seguidor = sessionStorage.getItem("usuario")
        const datos = {
            seguido: seguido,
            seguidor: seguidor,
            dejarSeguir: true
        }
        try {
            const response = await seguir(datos)
           
        } catch (error) {
            console.log(error.message)
        }
    } 
    
    const seguirUsuario = async (seguido) =>{
        const seguidor = sessionStorage.getItem("usuario")
        const datos = {
            seguido: seguido,
            seguidor: seguidor,
            dejarSeguir: false
        }
        try {
            const response = await seguir(datos)
           
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
        <Link href={`/dashboard/${usuarioLoggeado.username}`}>
            <div className=" flex items-center gap-4">
                <img src="../images/gatherLogo.png" alt="avatar" className="inline-block relative object-cover object-center !rounded-full w-12 h-12" />
                <div className="justify-start">
                <h6 className="text-slate-800 dark:text-gray-300 font-semibold">
                    {usuarioLoggeado.username}
                </h6>
                <p className="text-slate-600 text-sm dark:text-gray-500">
                    {usuarioLoggeado.nombre} {usuarioLoggeado.apellido}
                </p>
                </div>
                
            </div>
        </Link>

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
               
                    <div key={usuario._id} className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-orange-400 hover:text-black">
                         <Link  href={`/dashboard/${usuario.username}`}>
                         <div className="flex items-center">
                            <img className="rounded-full h-10 w-10" src="https://loremflickr.com/g/600/600/girl"/>
                            <div className="ml-2 flex flex-col">
                                <div className="text-slate-800 dark:text-gray-300 font-semibold"> {usuario.username}</div>
                                <div className="text-slate-600 text-sm dark:text-gray-500">{usuario.nombre} {usuario.apellido}</div>
                            </div>
                        </div> 
                        </Link>
                        {usuarioLoggeado.seguidos?.includes(usuario._id) ? (
                            <button type="submit" className="h-8 px-3 text-md font-bold text-orange-400 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100" onClick={(e) =>{dejarSeguirUsuario(usuario._id);window.location.reload()}}>Siguiendo</button>
                        ) : (
                            <button type="submit" className="h-8 px-3 text-md font-bold bg-orange-400 text-gray-800 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100" onClick={(e) =>{seguirUsuario(usuario._id);window.location.reload()}}>Seguir</button>
                        )}
                        
                    </div>
               
               
                
            ))}
            
        </div>

    </div>
    


    )
}
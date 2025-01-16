import { useEffect, useState } from "react"
import {fetchUsuariosByUsername,} from "../lib/usuarios"
import Link from "next/link"
import { buscarUsuarioId, dejarSeguirUsuario, seguirUsuario, verificar } from "../funciones"
import Image from "next/image"



export default function Buscador(){
    const [usuarioLogueado,setUsuarioLogueado] = useState({})
    const [usuariosEncontrados,setUsuariosEncontrados] = useState([])
    const [buscador,setBuscador] = useState('')

    const buscarUsuarios = async (buscador) =>{
        try {
            const response = await fetchUsuariosByUsername(buscador)
            setUsuariosEncontrados(response)
        } catch (error) {
            console.log(error.message)
        }
        
    }

    const handleChange = (event) =>{
        const dato = event.target.value
        setBuscador(dato)
        if (dato != "") {
            buscarUsuarios(dato)
        }else{
            setUsuariosEncontrados([])
        }
        
    }

    const handleClick = (usuario,dejar) =>{
        if (dejar) {
            dejarSeguirUsuario(usuario,usuarioLogueado._id).then(usuario => setUsuarioLogueado(usuario.seguidor))
        } else {
            seguirUsuario(usuario,usuarioLogueado._id).then(usuario => setUsuarioLogueado(usuario.seguidor))
        }
        buscarUsuarios(buscador)
    }


    useEffect(()=>{
        const token = sessionStorage.getItem("token");
            if (token) {
                verificar(token).then(dato =>{
                    buscarUsuarioId(dato.usuario.id).then(dato =>{
                        setUsuarioLogueado(dato)
                    })
                })
            }
         
         
    },[])

    return (
        
    <div className="xl:p-8 fixed w-2/6">
        <Link href={`/dashboard/user/${usuarioLogueado.username}`}>
            <div className=" flex items-center text-left gap-4">
                <img src={usuarioLogueado.foto || "/images/users.webp"} alt="avatar" className="border border-orange-400 inline-block relative object-cover object-center !rounded-full w-12 h-12" />
                <div className="justify-start">
                <h6 className="text-slate-800 dark:text-gray-300 font-semibold hover:text-orange-400">
                    {usuarioLogueado.username}
                </h6>
                <p className="text-slate-600 text-sm dark:text-gray-500">
                    {usuarioLogueado.nombre} {usuarioLogueado.apellido} 
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
               
                    <div key={usuario._id} className="p-3 flex items-center justify-between border-t cursor-pointer hover:dark:bg-gray-700 hover:bg-gray-300 hover:text-black">
                         <Link  href={`/dashboard/user/${usuario.username}`} className="w-full">
                         <div className="flex items-center">
                            <Image alt="fotoPerfil" width="40" height="40" className={`rounded-full h-10 w-10 border border-orange-400`} src={usuario.foto || "/images/users.webp"}/>
                            <div className="ml-2 flex flex-col">
                                <div className="text-slate-800 dark:text-gray-300 font-semibold"> {usuario.username}</div>
                                <div className="text-slate-600 text-sm dark:text-gray-500">{usuario.nombre} {usuario.apellido}</div>
                            </div>
                        </div> 
                        </Link>
                        {usuarioLogueado.seguidos?.includes(usuario._id) ? (
                            <button type="submit" className="h-8 px-3 text-md font-bold text-orange-400 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100" onClick={() =>{handleClick(usuario._id,true)}}>Siguiendo</button>
                        ) : (
                            <button type="submit" className="h-8 px-3 text-md font-bold bg-orange-400 text-gray-800 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100" onClick={() =>{handleClick(usuario._id,false)}}>Seguir</button>
                        )}
                        
                    </div>
               
               
                
            ))}
            
        </div>

    </div>
    


    )
}
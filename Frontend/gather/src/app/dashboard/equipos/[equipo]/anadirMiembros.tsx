"use client";

import { buscarUsuarioId, verificar } from "@/app/funciones";
import { apuntarseEquipo, fetchEquipoByNombre } from "@/app/lib/equipos";
import { fetchUsuariosByUsername } from "@/app/lib/usuarios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect,  useState } from "react";

export default function AniadirMiembro({onClose}){
    const [usuarioLogueado,setUsuarioLogueado] = useState({})
    const [usuariosEncontrados,setUsuariosEncontrados] = useState([])
    const [Equipo,setEquipo] = useState({})
    const router = useRouter()
    const params = useParams()
    const {equipo} = params

    const buscarUsuarios = async (buscador) =>{
        try {
            const response = await fetchUsuariosByUsername(buscador)
            setUsuariosEncontrados(response)
        } catch (error) {
            console.log(error.message)
        }
        
    }

    const buscarEquipo = async (equipo) =>{
        try {
            const response = await fetchEquipoByNombre(equipo)
            setEquipo(response)
        } catch (error) {
            console.log(error.message)
        }
    }

    const gestionarMiembro = async (idUsuario,desapuntarse) =>{
        try {
            const response = await apuntarseEquipo(idUsuario,Equipo._id,desapuntarse) 
            setEquipo(response)
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

    const handleClick = () =>{
        onClose(Equipo)
    }

    useEffect(()=>{
        const token = sessionStorage.getItem("token");
            if (token) {
                verificar(token).then(dato =>{
                    buscarUsuarioId(dato.usuario.id).then(dato =>{
                        setUsuarioLogueado(dato)
                    })
                })
            } else {
                router.push("/")
            }

    },[])

    useEffect(()=>{
        buscarEquipo(equipo)
    },[usuarioLogueado])

    return (
        
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="overflow-auto rounded-lg shadow-lg p-6 w-1/3 dark:bg-gray-800 bg-gray-100 h-5/6 lg:w-3/6 w-5/6 text-gray-800 dark:text-gray-300">
                    <div className="mb-5 flex flex-row items-center w-full justify-between">
                        <div className="mb-2 flex flex-row items-center">
                            <h1 className="text-xl font-bold text-black capitalize dark:text-gray-200">Añadir Miembros</h1>
                        </div>
                        <div className="mb-2 flex flex-row items-center">
                            <button className="rounded " onClick={handleClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button> 
                        </div>
                    </div> 
                    <div>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input onChange={handleChange} type="search" id="default-search" className="focus:outline-none block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-orange-400 focus:border-orange-400 dark:bg-gray-800 dark:placeholder-gray-300 dark:text-white" placeholder="Search"/>
                        </div>
                        {usuariosEncontrados.map((usuario) => (
                            Equipo.miembros.includes(usuario._id) ? "" : (
                                <div key={usuario._id} className="p-3 lg:flex items-center justify-between border-t cursor-pointer hover:bg-orange-400 hover:text-black">
                                    <Link  href={`/dashboard/user/${usuario.username}`}>
                                    <div className="flex items-center">
                                    <Image alt="fotoPerfil" width="40" height="40" className={`rounded-full h-10 w-10 border border-orange-400`} src={usuario.foto || "/images/users.webp"}/>
                                    <div className="ml-2 flex flex-col">
                                        <div className="text-slate-800 dark:text-gray-300 font-semibold"> {usuario.username}</div>
                                        <div className="text-slate-600 text-sm dark:text-gray-500">{usuario.nombre} {usuario.apellido}</div>
                                    </div>
                                </div> 
                                </Link>
                                
                                <button type="submit" className="mt-2 lg:mt-0 w-full h-8 px-3 text-md font-bold bg-orange-400 text-gray-800 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100" onClick={() =>{gestionarMiembro(usuario._id,false)}}>Añadir Miembro</button>
                            </div>
                            ) 
                            
                        ))}
                    </div>
                </div>
            </div>
    


    )
}
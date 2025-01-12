"use client";
import { buscarUsuarioId, verificar } from "@/app/funciones";
import { fetchQuedadasByNombre } from "@/app/lib/quedadas";
import { fetchEquiposByNombre, solicitarEquipo } from "@/app/lib/equipos";
import { fetchUsuariosByUsername } from "@/app/lib/usuarios";
import { MantineProvider, Tabs } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react"


export default function Explorar(){
    const [usuarioLogueado,setUsuarioLogueado] = useState({})
    const [mostrarUsuarios,setMostrarUsuarios] = useState([])
    const [mostrarQuedadas,setMostrarQuedadas] = useState([])
    const [mostrarEquipos,setMostrarEquipos] = useState([])

    const buscar = async (buscador) =>{
        try {
            const usuarios = await fetchUsuariosByUsername(buscador) || []
            const quedadas = await fetchQuedadasByNombre(buscador) || []
            const equipos = await fetchEquiposByNombre(buscador) || []

            setMostrarUsuarios(usuarios)
            setMostrarQuedadas(quedadas)
            setMostrarEquipos(equipos)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) =>{
        const dato = e.target.value
        if (dato != "") {
            buscar(dato)
        } else {
            setMostrarUsuarios([])
            setMostrarQuedadas([])
            setMostrarEquipos([])
        }
    }

    const solicitarUnion = async (idEquipo,solicitar) =>{
        try {
            const response = await solicitarEquipo(usuarioLogueado._id,idEquipo,solicitar)
            console.log(response)
        } catch (error) {
            console.log(error.message)
        }
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
        <MantineProvider>
        <div className="p-5">
            <div>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input  type="search" id="default-search" onChange={handleChange} className="focus:outline-none block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-orange-400 focus:border-orange-400 dark:bg-gray-800 dark:placeholder-gray-300 dark:text-white" placeholder="Search"/>
                </div>
            </div>
            <div>
            <Tabs color="orange" radius="md" defaultValue="Usuarios" className="justify-center items-center text-gray-800 dark:text-gray-300">
                        <Tabs.List grow>
                            <Tabs.Tab className="hover:bg-orange-400 hover:text-gray-800" value="Usuarios">
                                Usuarios
                            </Tabs.Tab>
                            <Tabs.Tab className="hover:bg-orange-400 hover:text-gray-800" value="Quedadas">
                                Quedadas
                            </Tabs.Tab>
                            <Tabs.Tab className="hover:bg-orange-400 hover:text-gray-800" value="Equipos">
                                Equipos
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="Usuarios">
                            {mostrarUsuarios.length === 0 ? ( <p>No se han encontrado usuarios</p> ) : ( 
                                mostrarUsuarios.map((usuario) =>(
                                    
                                    <div key={usuario._id} className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-700 hover:text-black">
                                        <Link  href={`/dashboard/user/${usuario.username}`}  className="w-full">
                                        <div className="flex items-center">
                                            <img className="rounded-full h-10 w-10 border border-orange-400" src={usuario.foto || "/images/users.webp"}/>
                                            <div className="ml-2 flex flex-col">
                                                <div className="text-slate-800 dark:text-gray-300 font-semibold"> {usuario.username}</div>
                                                <div className="text-slate-600 text-sm dark:text-gray-500">{usuario.nombre} {usuario.apellido}</div>
                                            </div>
                                        </div> 
                                        </Link>
                                        {usuario._id != usuarioLogueado._id ? (
                                            usuarioLogueado.seguidos?.includes(usuario._id) ? (
                                                <button type="submit" className="h-8 px-3 text-md font-bold text-orange-400 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100" onClick={(e) =>{dejarSeguirUsuario(usuario._id,usuarioLogueado._id);window.location.reload()}}>Siguiendo</button>
                                            ) : (
                                                <button type="submit" className="h-8 px-3 text-md font-bold bg-orange-400 text-gray-800 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100" onClick={(e) =>{seguirUsuario(usuario._id,usuarioLogueado._id);window.location.reload()}}>Seguir</button>
                                            )
                                        ) : ""}
                                        
                                        </div>
                                ))
                                )}
                        </Tabs.Panel>

                        <Tabs.Panel value="Quedadas">
                            {mostrarQuedadas.length === 0 ? ( <p>No se han encontrado quedadas</p> ) : (
                                 mostrarQuedadas.map(quedada => ( 
                                    <div key={quedada._id} className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-700 hover:text-black">
                                        <Link  href={`/dashboard/quedadas/${quedada._id}`}  className="w-full">
                                            <div className="flex items-center">
                                                <div className="ml-2 flex flex-col">
                                                    <div className="text-slate-800 dark:text-gray-300 font-semibold"> {quedada.nombre}</div>
                                                    <div className="text-slate-600 text-sm dark:text-gray-500">{quedada.fecha}</div>
                                                </div>
                                            </div> 
                                        </Link>
                                        <div>
                                            <div className={`mr-4 rounded-3xl p-2 px-4 text-black ${quedada.estado == "En curso" ? "bg-yellow-400" : (quedada.estado == "Finalizada" ? "bg-red-400" : "bg-green-400")}`}>
                                                {quedada.estado}
                                            </div>
                                        </div>
                                    </div>
                                  )) 
                                 )}
                        </Tabs.Panel>

                        <Tabs.Panel value="Equipos">
                            {mostrarEquipos.length === 0 ? ( <p>No se han encontrado equipos</p> ) : (
                                 mostrarEquipos.map(equipo => ( 
                                    usuarioLogueado.equipos.includes(equipo._id) ? "" : (
                                        <div key={equipo._id} className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-700 hover:text-black">
                                            <div className="flex items-center">
                                                <img className="rounded-full h-10 w-10 border border-orange-400" src={equipo.foto || "/images/users.webp"}/>
                                                <div className="ml-2 flex flex-col">
                                                    <div className="text-slate-800 dark:text-gray-300 font-semibold">{equipo.nombre}</div>
                                                </div>
                                            </div> 
                                            <div>
                                                {usuarioLogueado.solicitudes.includes(equipo._id)? (
                                                    <button type="submit" className="text-black h-8 px-3 text-md font-bold bg-green-400  rounded-xl hover:bg-green-100 " onClick={(e) =>{solicitarUnion(equipo._id,false)}}>Quitar Solicitud</button>    
                                                ) : (
                                                    <button type="submit" className="text-black h-8 px-3 text-md font-bold bg-green-400  rounded-xl hover:bg-green-100 " onClick={(e) =>{solicitarUnion(equipo._id,true)}}>Solicitar Union</button>    
                                                )}
                                                
                                            </div>   
                                        </div>
                                    ) 
                                  )) 
                                 )}
                        </Tabs.Panel>
                    </Tabs>
            </div>
        </div>
        </MantineProvider>
    )
} 
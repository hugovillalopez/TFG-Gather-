"use client";
import { buscarUsuarioId, fetchUsuarios, verificar } from "@/app/funciones";
import { adminsEquipo, apuntarseEquipo, fetchEquipoByNombre } from "@/app/lib/equipos";
import { MantineProvider, Tabs } from "@mantine/core";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import AniadirMiembro from "./anadirMiembros";
import { fetchQuedadasPorEquipo } from "@/app/lib/quedadas";


export default function Equipo() {
    const [usuarioLogueado,setUsuarioLogueado] = useState({})
    const [Equipo,setEquipo] = useState({})
    const [Miembros,setMiembros] = useState([])
    const [Quedadas,setQuedadas] = useState([])
    const [Solicitudes,setSolicitudes] = useState([])
    const [mostrarAniadir,setMostrarAniadir] = useState(false)
    const router = useRouter()
    const params = useParams()
    const {equipo} = params

    const buscarEquipo = async (equipo) =>{
        try {
            const response = await fetchEquipoByNombre(equipo)
            if (response != null) {
               setEquipo(response) 
            } else{ 
                router.push('/dashboard/equipos')
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const buscarMiembros = async (equipo) =>{
        if (equipo.miembros && equipo.miembros.length > 0) {
            const miembrosData = await fetchUsuarios(equipo.miembros)
            setMiembros(miembrosData)
        }
    }

    const buscarSolicitudes = async (equipo) =>{
        if (equipo.solicitudes && equipo.solicitudes.length > 0) {
            const solicitudesData = await fetchUsuarios(equipo.solicitudes)
            setSolicitudes(solicitudesData)
        }
    }

    const gestionarMiembro = async (idUsuario,desapuntarse) =>{
        try {
            const response = await apuntarseEquipo(idUsuario,Equipo._id,desapuntarse) 
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const adminsMiembro = async (idUsuario,quitar) =>{
        try {
            const response = await adminsEquipo(idUsuario,Equipo._id,quitar) 
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const buscarQuedadas = async (equipo) => {
        try {
            const response = await fetchQuedadasPorEquipo(equipo)
            console.log(response)
            setQuedadas(response)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect((() =>{
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
    }),[])

    useEffect(() =>{
        buscarEquipo(equipo.replace(/-/g, ' '))
        if (Object.keys(usuarioLogueado).length != 0) {
            if (Object.keys(Equipo).length > 0 && !Equipo.miembros.includes(usuarioLogueado._id)) {
                router.push("/dashboard/equipos")
            }
            buscarMiembros(Equipo)
            buscarSolicitudes(Equipo)
            buscarQuedadas(Equipo._id)

        }
        
    },[usuarioLogueado])

    return (
        <MantineProvider>
            <div>
            <div className="flex items-center text-xl border-b pb-4 bg-gray-700 p-5 ">
                <img className={`rounded-full h-14 w-14 p-1 mr-5 ${!Equipo.foto ? "border" : ""}`} src={Equipo.foto || "/images/users.webp"}/>
                <div>
                    <h1>{Equipo.nombre}</h1>  
                </div>
            </div>

            {mostrarAniadir && <AniadirMiembro onClose={() => setMostrarAniadir(false)}/>}

            <Tabs color="orange" radius="md" defaultValue="Quedadas" className="justify-center items-center text-gray-800 dark:text-gray-300">
                        <Tabs.List grow>
                            <Tabs.Tab className="hover:bg-orange-400 hover:text-gray-800" value="Quedadas">
                                Quedadas
                            </Tabs.Tab>
                            <Tabs.Tab className="hover:bg-orange-400 hover:text-gray-800" value="Miembros">
                                Miembros
                            </Tabs.Tab>
                            <Tabs.Tab className="hover:bg-orange-400 hover:text-gray-800" value="Solicitudes">
                                Solicitudes
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="Quedadas">
                            {Quedadas.length === 0 ? ( <p>No se han encontrado quedadas</p> ) : (
                                 Quedadas.map(quedada => ( 
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

                        <Tabs.Panel value="Miembros">
                            <div className="justify-center flex">
                                {Object.keys(Equipo).length == 0 ? "" : (!Equipo.admins.includes(usuarioLogueado._id) ? "" : (
                                    <button type="submit" className="flex items-center m-2 text-black h-8 px-2 text-md font-bold bg-green-400  rounded-lg hover:bg-green-300 " onClick={(e) =>{setMostrarAniadir(true)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Añadir Miembros
                                    </button>
                                ))}
                                <button type="submit" className="flex items-center m-2 text-black h-8 px-3 text-md font-bold bg-red-400 text-gray-800 rounded-lg hover:bg-red-300" onClick={(e) =>{gestionarMiembro(usuarioLogueado._id,true)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                    </svg>
                                    Abandonar Equipo
                                </button>
                            </div>
                            {Miembros.length === 0 ? ( <p>No se han encontrado usuarios</p> ) : ( 
                                Miembros.map((usuario) =>(
                                    
                                    <div key={usuario._id} className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-700 hover:text-black">
                                        <Link  href={`/dashboard/user/${usuario.username}`}  className="w-full">
                                            <div className="flex items-center">
                                                <img className="rounded-full h-10 w-10 border border-orange-400" src={usuario.foto || "/images/users.webp"}/>
                                                <div className="ml-2 flex flex-col">
                                                    <div className="flex text-slate-800 dark:text-gray-300 font-semibold"> 
                                                        {usuario.username}
                                                        {Equipo.admins.includes(usuario._id) ? (
                                                            <div className="border rounded-2xl border-green-400 text-green-400 px-2 ml-2 items-center text-sm">
                                                                Admin
                                                            </div>
                                                        ) : ""}
                                                    </div>
                                                    <div className="text-slate-600 text-sm dark:text-gray-500">{usuario.nombre} {usuario.apellido}</div>
                                                </div>
                                            </div> 
                                        </Link>
                                        {usuario._id != usuarioLogueado._id ? (
                                            <div>
                                                {Equipo.creador != usuario._id ? (Equipo.admins.includes(usuario._id) ? (
                                                    <button type="submit" className="text-green-400 m-2 h-8 px-3 text-md font-bold border border-green-400   rounded-xl hover:bg-green-100 " onClick={(e) =>{adminsMiembro(usuario._id,true)}}>Quitar Admin</button>
                                                ) : (
                                                    <button type="submit" className="text-black m-2 h-8 px-3 text-md font-bold bg-green-400  rounded-xl hover:bg-green-100 " onClick={(e) =>{adminsMiembro(usuario._id,false)}}>Hacer Admin</button>
                                                )) : ""}
                                                {Equipo.creador != usuario._id ? (
                                                    <button type="submit" className="text-black m-2 h-8 px-3 text-md font-bold bg-red-400 text-gray-800 rounded-xl hover:bg-red-100" onClick={(e) =>{gestionarMiembro(usuario._id,true)}}>Echar del Equipo</button>
                                                ) : ""}
                                                
                                            </div>
                                        ) : ""}
                                        
                                    </div>
                                ))
                                )}
                        </Tabs.Panel>

                        <Tabs.Panel value="Solicitudes">
                            {Solicitudes.length === 0 ? ( <p>No hay solicitudes</p> ) : ( 
                                Solicitudes.map((usuario) =>(
                                    <div key={usuario._id} className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-700 hover:text-black">
                                        <Link  href={`/dashboard/user/${usuario.username}`}  className="w-full">
                                            <div className="flex items-center">
                                                <img className="rounded-full h-10 w-10 border border-orange-400" src={usuario.foto || "/images/users.webp"}/>
                                                <div className="ml-2 flex flex-col">
                                                    <div className="flex text-slate-800 dark:text-gray-300 font-semibold"> 
                                                        {usuario.username}
                                                    </div>
                                                    <div className="text-slate-600 text-sm dark:text-gray-500">{usuario.nombre} {usuario.apellido}</div>
                                                </div>
                                            </div> 
                                        </Link>
                                        <button type="submit" className="h-8 px-3 text-md font-bold bg-orange-400 text-gray-800 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100" onClick={(e) =>{gestionarMiembro(usuario._id,false)}}>Aceptar</button>
                                    </div>
                                ))
                                )}
                        </Tabs.Panel>
                    </Tabs>
            </div>
        </MantineProvider>
    )
}
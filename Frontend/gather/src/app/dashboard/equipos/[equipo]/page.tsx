"use client";
import { buscarUsuarioId, fetchUsuarios, verificar } from "@/app/funciones";
import { adminsEquipo, apuntarseEquipo, fetchEquipoByNombre, solicitarEquipo } from "@/app/lib/equipos";
import { MantineProvider, Tabs } from "@mantine/core";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import AniadirMiembro from "./anadirMiembros";
import { fetchQuedadasPorEquipo } from "@/app/lib/quedadas";
import EditarEquipo from "./editarEquipo";
import Image from "next/image";


export default function Equipo() {
    const [usuarioLogueado,setUsuarioLogueado] = useState({})
    const [Equipo,setEquipo] = useState({})
    const [Miembros,setMiembros] = useState([])
    const [Quedadas,setQuedadas] = useState([])
    const [Solicitudes,setSolicitudes] = useState([])
    const [mostrarAniadir,setMostrarAniadir] = useState(false)
    const [mostrarEditar,setMostrarEditar] = useState(false)
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
        } else {
            setSolicitudes([])
        }
    }

    const gestionarMiembro = async (idUsuario,desapuntarse) =>{
        try {
            const response = await apuntarseEquipo(idUsuario,Equipo._id,desapuntarse) 
            
            setEquipo(response)
            buscarMiembros(response)
            buscarSolicitudes(response)
        } catch (error) {
            console.log(error.message)
        }
    }

    const gestionarSolicitudes = async (idUsuario,solicitud) =>{
        try {
            const response = await solicitarEquipo(idUsuario,Equipo._id,solicitud) 
            console.log(response.equipo)
            setEquipo(response.equipo)
            buscarMiembros(response.equipo)
            buscarSolicitudes(response.equipo)
        } catch (error) {
            console.log(error.message)
        }
    }

    const adminsMiembro = async (idUsuario,quitar) =>{
        try {
            const response = await adminsEquipo(idUsuario,Equipo._id,quitar) 
            setEquipo(response)
            buscarMiembros(response)
        } catch (error) {
            console.log(error.message)
        }
    }

    const buscarQuedadas = async (equipo) => {
        try {
            const response = await fetchQuedadasPorEquipo(equipo)
            setQuedadas(response)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleAniadir = (equipo) =>{
        setMostrarAniadir(false)
        if (equipo._id && equipo.nombre) {
            setEquipo(equipo)
            buscarMiembros(equipo)
            buscarSolicitudes(equipo)
            buscarQuedadas(equipo._id)
        }
        
    }

    const handleEditar = (equipo) =>{
        setMostrarEditar(false)
        if (equipo._id && equipo.nombre) {
            setEquipo(equipo)
            buscarMiembros(equipo)
            buscarSolicitudes(equipo)
            buscarQuedadas(equipo._id)
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
        buscarEquipo(equipo?.replace("_", ' '))
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
            <div className="h-auto">
                <div className="flex items-center text-xl border-b pb-4 dark:bg-gray-700 bg-gray-300 p-5">
                    <Image alt="foto" width="40" height="40" className={`rounded-full lg:h-14 lg:w-14 h-10 w-10 p-1 lg:mr-5 ${!Equipo.foto ? "border" : ""}`} src={Equipo.foto || "/images/users.webp"}/>
                    <div className="justify-between items-center w-full flex">
                        <h1 className="dark:text-gray-200 text-black">{Equipo.nombre}</h1> 
                        {Object.keys(Equipo).length != 0 && Equipo.admins.includes(usuarioLogueado._id) && 
                            <button onClick={() => setMostrarEditar(true)} className="flex items-center lg:m-2 font-bold text-black h-8 px-2 text-sm lg:text-md bg-orange-400  rounded-lg hover:bg-orange-200 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                Editar Equipo
                            </button>
                            }
                    </div>
                </div>

            {mostrarAniadir && <AniadirMiembro onClose={handleAniadir}/>}
            {mostrarEditar && <EditarEquipo onClose={handleEditar}/>}

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
                                    <div key={quedada._id} className="p-3 flex items-center justify-between border-t dark:border-white border-black cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-700 hover:text-black">
                                        <Link  href={`/dashboard/quedadas/${quedada._id}`}  className="w-full">
                                            <div className="flex items-center justify-between">
                                                <div className="ml-2 flex flex-col">
                                                    <div className="text-slate-800 dark:text-gray-300 font-semibold"> {quedada.nombre}</div>
                                                    <div className="text-slate-600 text-sm dark:text-gray-500">{quedada.fecha}</div>
                                                </div>
                                                <div className={`lg:mr-4 rounded-3xl p-2 px-4 text-sm lg:text-md text-black ${quedada.estado == "En curso" ? "bg-yellow-400" : (quedada.estado == "Finalizada" ? "bg-red-400" : "bg-green-400")}`}>
                                                    {quedada.estado}
                                                </div>
                                            </div> 
                                        </Link>
                                        
                                    </div>
                                  )) 
                                 )}
                        </Tabs.Panel>

                        <Tabs.Panel value="Miembros">
                            <div className="justify-center grid place-items-center sm:flex">
                                {Object.keys(Equipo).length == 0 ? "" : (!Equipo.admins.includes(usuarioLogueado._id) ? "" : (
                                    <button type="submit" className="flex items-center m-2 text-black h-8 px-2 text-sm lg:text-md font-bold bg-green-400  rounded-lg hover:bg-green-300 " onClick={() =>{setMostrarAniadir(true)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Añadir Miembros
                                    </button>
                                ))}
                                <button type="submit" className="flex items-center m-2 text-black h-8 px-3 text-sm lg:text-md font-bold bg-red-400 text-gray-800 rounded-lg hover:bg-red-300" onClick={() =>{gestionarMiembro(usuarioLogueado._id,true);router.push("/dashboard/equipos")}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                    </svg>
                                    Abandonar Equipo
                                </button>
                            </div>
                            {Miembros.length === 0 ? ( <p>No se han encontrado usuarios</p> ) : ( 
                                Miembros.map((usuario) =>(
                                    
                                    <div key={usuario._id} className="sm:p-3 p-2 sm:flex items-center sm:justify-between border-t dark:border-white border-black cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-700 hover:text-black">
                                        <Link  href={`/dashboard/user/${usuario.username}`}  className="w-full">
                                            <div className="flex items-center">
                                                <Image alt="foto" width="40" height="40" className="rounded-full h-10 w-10 border border-orange-400" src={usuario.foto || "/images/users.webp"}/>
                                                <div className="ml-2 flex flex-col">
                                                    <div className="flex text-slate-800 dark:text-gray-300 font-semibold"> 
                                                        {usuario.username}
                                                        {Equipo.admins.includes(usuario._id) ? (
                                                            <div className="border rounded-2xl border-green-400 text-green-400 px-2 ml-2 items-center text-sm hover:bg-green-400 hover:text-black">
                                                                Admin
                                                            </div>
                                                        ) : ""}
                                                    </div>
                                                    <div className="text-slate-600 text-sm dark:text-gray-500">{usuario.nombre} {usuario.apellido}</div>
                                                </div>
                                            </div> 
                                        </Link>
                                        {usuario._id != usuarioLogueado._id ? (
                                            <div className="flex items-center w-full justify-end">
                                                {Equipo.creador != usuario._id ? (Equipo.admins.includes(usuario._id) ? (
                                                    <button type="submit" className="text-green-400 m-2 h-8 px-3 text-sm sm:text-md font-bold border border-green-400   rounded-xl hover:bg-green-100 " onClick={() =>{adminsMiembro(usuario._id,true)}}>Quitar Admin</button>
                                                ) : (
                                                    <button type="submit" className="text-black m-2 h-8 px-3 text-sm sm:text-md font-bold bg-green-400  rounded-xl hover:bg-green-100 " onClick={() =>{adminsMiembro(usuario._id,false)}}>Hacer Admin</button>
                                                )) : ""}
                                                {Equipo.creador != usuario._id ? (
                                                    <button type="submit" className="text-black m-2 h-8 px-3 text-sm sm:text-md font-bold bg-red-400 text-gray-800 rounded-xl hover:bg-red-100" onClick={() =>{gestionarMiembro(usuario._id,true)}}>Echar del Equipo</button>
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
                                    <div key={usuario._id} className="p-3 flex items-center justify-between border-t dark:border-white border-black cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-700 hover:text-black">
                                        <Link  href={`/dashboard/user/${usuario.username}`}  className="w-full">
                                            <div className="flex items-center">
                                                <Image alt="foto" width="40" height="40" className="rounded-full h-10 w-10 border border-orange-400" src={usuario.foto || "/images/users.webp"}/>
                                                <div className="ml-2 flex flex-col">
                                                    <div className="flex text-slate-800 dark:text-gray-300 font-semibold"> 
                                                        {usuario.username}
                                                    </div>
                                                    <div className="text-slate-600 text-sm dark:text-gray-500">{usuario.nombre} {usuario.apellido}</div>
                                                </div>
                                            </div> 
                                        </Link>
                                        {Object.keys(Equipo).length == 0 ? "" : (!Equipo.admins.includes(usuarioLogueado._id) ? "" : (
                                        <div className="flex">
                                            <button type="submit" className="h-8 mr-1 px-3 text-md font-bold bg-green-400 text-gray-800 border border-green-600 rounded-xl hover:bg-green-100  hover:border-green-600" onClick={() =>{gestionarMiembro(usuario._id,false)}}>Aceptar</button>
                                            <button type="submit" className="h-8 px-3 text-md font-bold bg-red-400 text-gray-800 border border-red-600 rounded-xl hover:bg-red-100  hover:border-red-600" onClick={() =>{gestionarSolicitudes(usuario._id,false)}}>Denegar</button>
                                        </div>
                                        ))}
                                    </div>
                                ))
                                )}
                        </Tabs.Panel>
                    </Tabs>
            </div>
        </MantineProvider>
    )
}
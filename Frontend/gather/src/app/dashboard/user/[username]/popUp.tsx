"use client";
import { buscarUsuario, buscarUsuarioId, dejarSeguirUsuario, fetchUsuarios, seguirUsuario, verificar } from "@/app/funciones";
import { fetchQuedadaById } from "@/app/lib/quedadas";
import { fetchUsuarioById, fetchUsuarioByUsername, seguir, verificarId } from "@/app/lib/usuarios"
import { MantineProvider, Tabs } from "@mantine/core"
import Link from "next/link";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function PopUp({tab, onClose}){
    const [usuarioLogueado,setUsuarioLogueado] = useState({})
    const [usuario1,setUsuario] = useState({})
    const [seguidos,setSeguidos] = useState([])
    const [mostrarSeguidos,setMostrarSeguidos] = useState([])
    const [mostrarSeguidores,setMostrarSeguidores] = useState([])
    const [seguidores,setSeguidores] = useState([])
    const [quedadasCreadas,setQuedadasCreadas] = useState([]) 
    const [tabActivo,setTabActivo] = useState(tab)
    const params = useParams()
    const {username} = params

    

    const fetchQuedadas = async (quedadasIds) => { 
        try { 
            const responses = await Promise.all(quedadasIds.map(_id => fetchQuedadaById(_id))); 
            return responses; 
        } catch (error) { 
            console.error('Error fetching usuarios:', error); 
        } 
    }

    const conseguirSeguidores = async (usuario) =>{
        if (usuario.seguidores && usuario.seguidores.length > 0) { 
            const seguidoresData = await fetchUsuarios(usuario.seguidores); 
            setSeguidores(seguidoresData);
            setMostrarSeguidores(seguidoresData)
        } else { 
            setSeguidores([]); 
        } 
    }

    const conseguirSeguidos = async (usuario) =>{
        if (usuario.seguidos && usuario.seguidos.length > 0) { 
            const seguidosData = await fetchUsuarios(usuario.seguidos); 
            setSeguidos(seguidosData);
            setMostrarSeguidos(seguidosData) 
        } else {
            setSeguidos([]); 
        }

    }

    const conseguirQuedadas = async (usuario) =>{
        if (usuario.quedadasCreadas && usuario.quedadasCreadas.length > 0) { 
            const quedadasData = await fetchQuedadas(usuario.quedadasCreadas); 
            setQuedadasCreadas(quedadasData); 
        } else { 
            setQuedadasCreadas([]); 
        } 

    }

    const handleChange = (e) =>{
        const username = e.target.value
        if (tabActivo == "Seguidos") {
            if (username != "") {
                const seguidosFiltrado = seguidos.filter((usuario) => usuario.username.startsWith(username))
                setMostrarSeguidos(seguidosFiltrado)
            }else{
                setMostrarSeguidos(seguidos)
            }
        }else if (tabActivo == "Seguidores") {
            if (username != "") {
                const seguidoresFiltrado = seguidores.filter((usuario) => usuario.username.startsWith(username))
                setMostrarSeguidores(seguidoresFiltrado)
            }else{
                setMostrarSeguidores(seguidores)
            }
        }
        
        
    }

    useEffect(() => {
        if (username) {
            const fetchAndSetUser = async () => {
                const user = await buscarUsuario(username);
                setUsuario(user);

                conseguirSeguidos(user)
                conseguirSeguidores(user)
                conseguirQuedadas(user)
                    
            };
            fetchAndSetUser();
            const token = sessionStorage.getItem("token");
            if (token) {
                verificar(token).then(dato =>{
                    buscarUsuarioId(dato.usuario.id).then(dato =>{
                        setUsuarioLogueado(dato)
                    })
                })
            }
        }
    }, [username]);


    return (
        <MantineProvider>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="overflow-auto rounded-lg shadow-lg p-6 w-1/3 dark:bg-gray-800 bg-gray-100 h-3/4 w-2/6 text-gray-800 dark:text-gray-300">
                    <div className="mb-5 flex flex-row items-center">
                        <button className="rounded mr-4" onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button> 
                        <div className="relative mr-5 w-2/3 w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" onChange={handleChange} id="default-search" className="focus:outline-none block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-orange-400 focus:border-orange-400 dark:bg-gray-800 dark:placeholder-gray-300 dark:text-white" placeholder="Search"/>
                        </div>
                
                        
                        
                    </div> 
                    
                    <Tabs color="orange" radius="md" defaultValue={tab} value={tabActivo} onChange={(e) => setTabActivo(e)} className="justify-center items-center text-gray-800 dark:text-gray-300">
                        <Tabs.List grow>
                            <Tabs.Tab className="hover:bg-orange-400 hover:text-gray-800" value="Seguidos">
                                Seguidos
                            </Tabs.Tab>
                            <Tabs.Tab className="hover:bg-orange-400 hover:text-gray-800" value="Seguidores">
                                Seguidores
                            </Tabs.Tab>
                            <Tabs.Tab className="hover:bg-orange-400 hover:text-gray-800" value="Quedadas">
                                Quedadas
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="Seguidos">
                            {mostrarSeguidos.length === 0 ? ( <p>No hay usuarios seguidos.</p> ) : ( 
                                mostrarSeguidos.map((usuario) =>(
                                    
                                    <div key={usuario._id} className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-700 hover:text-black">
                                        <Link  href={`/dashboard/user/${usuario.username}`}  className="w-full">
                                        <div className="flex items-center">
                                            <img className="rounded-full h-10 w-10" src={usuario.foto || "/images/users.webp"}/>
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

                        <Tabs.Panel value="Seguidores">
                            {mostrarSeguidores.length === 0 ? ( <p>No hay seguidores</p> ) : (
                                 mostrarSeguidores.map(usuario => (
                                    <div key={usuario._id} className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-700 hover:text-black">
                                        <Link  href={`/dashboard/user/${usuario.username}`}  className="w-full">
                                        <div className="flex items-center">
                                            <img className="rounded-full h-10 w-10" src={usuario.foto || "/images/users.webp"}/>
                                            <div className="ml-2 flex flex-col">
                                                <div className="text-slate-800 dark:text-gray-300 font-semibold"> {usuario.username}</div>
                                                <div className="text-slate-600 text-sm dark:text-gray-500">{usuario.nombre} {usuario.apellido}</div>
                                            </div>
                                        </div> 
                                        </Link>
                                        {usuario._id != usuarioLogueado._id ? (
                                            usuarioLogueado.seguidos?.includes(usuario._id) ? (
                                                <button type="submit" className="h-8 px-3 text-md font-bold text-orange-200 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100" onClick={(e) =>{dejarSeguirUsuario(usuario._id);window.location.reload()}}>Siguiendo</button>
                                            ) : (
                                                <button type="submit" className="h-8 px-3 text-md font-bold bg-orange-400 text-gray-800 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100" onClick={(e) =>{seguirUsuario(usuario._id);window.location.reload()}}>Seguir</button>
                                            )
                                        ) : ""}
                                    </div>
                                 ))
                                 )}
                        </Tabs.Panel>

                        <Tabs.Panel value="Quedadas">
                            {quedadasCreadas.length === 0 ? ( <p>No hay quedadas creadas.</p> ) : (
                                 quedadasCreadas.map(quedada => ( 
                                    <div key={quedada._id} className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-700 hover:text-black">
                                        <Link  href={`/dashboard/quedada/${quedada._id}`}  className="w-full">
                                            <div className="flex items-center">
                                                <div className="ml-2 flex flex-col">
                                                    <div className="text-slate-800 dark:text-gray-300 font-semibold"> {quedada.nombre}</div>
                                                    <div className="text-slate-600 text-sm dark:text-gray-500">{quedada.fecha}</div>
                                                </div>
                                            </div> 
                                        </Link>
                                        
                                        
                                    </div>
                                  )) 
                                 )}
                        </Tabs.Panel>
                    </Tabs>
                    
                </div>
            </div>
        </MantineProvider>
    )

}
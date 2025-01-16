"use client";
import {fetchUsuarioById, fetchUsuarioByUsername, verificarId} from "@/app/lib/usuarios";
import { useParams, useRouter} from "next/navigation";
import { useEffect, useState } from "react"
import { ProtectedRoute } from "../../protectedRoutes";
import PopUp from "./popUp";
import EditarPerfil from "./editarPerfil";
import { buscarUsuario, buscarUsuarioId, verificar } from "@/app/funciones";
import Link from "next/link";
import { fetchQuedadaById } from "@/app/lib/quedadas";



export default function perfilUsuario(){
    const [usuarioLogueado,setUsuarioLogueado] = useState({})
    const [usuario,setUsuario] = useState({})
    const [tab,setTab] = useState("")
    const [mostrar,setMostrar] = useState(false)
    const [editarPerfil,setEditarPerfil] = useState(false)
    const [quedadasCreadas,setQuedadasCreadas] = useState([]) 
    const params = useParams()
    const {username} = params
    const router = useRouter()

    const handleClickEditar = (usuario) =>{
        setEditarPerfil(false)
        if (usuario._id && usuario.username) {
            setUsuario(usuario)
        }
    }

    const handleClick = (usuario) =>{
        setMostrar(false)
        if (usuario._id == usuarioLogueado._id && usuario._id && usuario.username) {
            setUsuario(usuario)
        }
    }

    const fetchQuedadas = async (quedadasIds) => { 
        try { 
            const responses = await Promise.all(quedadasIds.map(_id => fetchQuedadaById(_id))); 
            return responses; 
        } catch (error) { 
            console.error('Error fetching usuarios:', error); 
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

    useEffect(() => {
        if (username) {
            const fetchAndSetUser = async () => {
                const user = await buscarUsuario(username);
                setUsuario(user);
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
            } else {
                router.push("/")
            }
        }
    }, [username]);
    
    
    

    return (

        <ProtectedRoute>
            {mostrar && <PopUp tab={tab} onClose={handleClick}/>}
            {editarPerfil && <EditarPerfil onClose={handleClickEditar}/>}

        <div className="lg:flex flex-col md:flex-row pt-10 text-gray-800 dark:text-gray-300">
            <div className="md:w-1/3 text-center mb-8 md:mb-0">
                <img src={usuarioLogueado.foto || "/images/users.webp"} alt="Profile Picture" className="rounded-full lg:w-40 lg:h-40 w-24 h-24 mx-auto mb-4 border-4 border-orange-400 transition-transform duration-300 hover:scale-105"/>
            </div>
            
            <div className="md:w-2/3 ">
                <div className="lg:flex lg:justify-between text-center lg:mr-5">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-300 mb-2">{usuario.username}</h1>
                        <p className="text-gray-600 mb-6 text-lg">{usuario.nombre} {usuario.apellido}</p> 
                    </div>
                    <div>
                        {usuarioLogueado._id == usuario._id && <button onClick={() => setEditarPerfil(true)} className="mt-4 font-bold text-black bg-orange-400 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-orange-200 hover:text-gray-800 transition-colors duration-300 ring ring-orange-400 hover:ring-orange-400">Editar Perfil</button>}
                    </div>
                </div>
                
                    <div className="justify-start sm:justify-center sm:flex">
                        
                                <div className="text-center" onClick={(e) =>{setTab("Seguidos");setMostrar(true)}}>
                                    <p className="p-3 pb-0 text-lg">Seguidos</p>
                                    <p className="text-2xl">{usuario?.seguidos?.length || 0}</p>
                                </div>
                                <div className="text-center" onClick={(e) =>{setTab("Seguidores");setMostrar(true)}}>
                                    <p className="p-3 pb-0 text-lg">Seguidores</p>
                                    <p className="text-2xl">{usuario?.seguidores?.length || 0}</p>
                                </div>
                                <div className="text-center" onClick={(e) =>{setTab("Equipos");setMostrar(true)}}>
                                    <p className="p-3 pb-0 text-lg">Equipos</p>
                                    <p className="text-2xl">{usuario?.equipos?.length || 0}</p>
                                </div>
                                <div className="text-center">
                                    <p className="p-3 pb-0 text-lg">Quedadas</p>
                                    <p className="text-2xl">{usuario?.quedadasCreadas?.length || 0}</p>
                                </div>
                            
                    </div> 
                
            </div>
            
        </div>
        <div className="overflow-y-auto border p-2 max-h-80 m-10 shadow-lg rounded bg-gray-200 dark:bg-[#232f41]">
            {quedadasCreadas.length === 0 ? ( <p>No hay quedadas creadas.</p> ) : (
                quedadasCreadas.map(quedada => ( 
                    <div key={quedada._id} className="p-3 flex items-center justify-between border-t dark:border-white border-black cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-700 hover:text-black">
                        <Link  href={`/dashboard/quedada/${quedada._id}`}  className="w-full">
                            <div className="flex items-center justify-between ">
                                <div className="ml-2 flex flex-col">
                                    <div className="text-slate-800 dark:text-gray-300 font-semibold"> {quedada.nombre}</div>
                                    <div className="text-slate-600 text-sm dark:text-gray-500">{quedada.fecha}</div>
                                </div>
                                <div className={`justify-center sm:text-md text-sm sm:w-30 w-24 items-center sm:mr-2 rounded-3xl p-2 px-4 text-black ${quedada.estado == "En curso" ? "bg-yellow-400" : (quedada.estado == "Finalizada" ? "bg-red-400" : "bg-green-400")}`}>
                                    {quedada.estado}
                                </div>
                            </div> 
                
                        </Link>      
                    </div>
                )) 
            )}
        </div>

    </ProtectedRoute>

    )
}
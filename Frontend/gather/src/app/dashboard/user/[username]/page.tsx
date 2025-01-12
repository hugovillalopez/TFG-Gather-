"use client";
import {fetchUsuarioById, fetchUsuarioByUsername, verificarId} from "@/app/lib/usuarios";
import { useParams} from "next/navigation";
import { useEffect, useState } from "react"
import { ProtectedRoute } from "../../protectedRoutes";
import PopUp from "./popUp";
import EditarPerfil from "./editarPerfil";
import { buscarUsuario, buscarUsuarioId, verificar } from "@/app/funciones";



export default function perfilUsuario(){
    const [usuarioLogueado,setUsuarioLogueado] = useState({})
    const [usuario,setUsuario] = useState({})
    const [tab,setTab] = useState("")
    const [mostrar,setMostrar] = useState(false)
    const [editarPerfil,setEditarPerfil] = useState(false)
    const params = useParams()
    const {username} = params

    useEffect(() => {
        if (username) {
            const fetchAndSetUser = async () => {
                const user = await buscarUsuario(username);
                setUsuario(user);
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

        <ProtectedRoute>
            {mostrar && <PopUp tab={tab} onClose={() =>{setMostrar(false)}}/>}
            {editarPerfil && <EditarPerfil onClose={() =>{setEditarPerfil(false)}}/>}

        <div className="flex flex-col md:flex-row pt-10 text-gray-800 dark:text-gray-300">
            <div className="md:w-1/3 text-center mb-8 md:mb-0">
                <img src={usuarioLogueado.foto || "/images/users.webp"} alt="Profile Picture" className="rounded-full w-40 h-40 mx-auto mb-4 border-4 border-orange-400 transition-transform duration-300 hover:scale-105"/>
                {usuarioLogueado._id == usuario._id && <button onClick={() => setEditarPerfil(true)} className="mt-4 font-bold text-orange-400 bg-transparent dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-orange-400 hover:text-gray-800 transition-colors duration-300 ring ring-orange-400 hover:ring-orange-400">Editar Perfil</button>}
            </div>
            
            <div className="md:w-2/3 md:pl-4">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-300 mb-2">{usuario.username}</h1>
                <p className="text-gray-600 mb-6 text-lg">{usuario.nombre} {usuario.apellido}</p>

                <h2 className="text-xl font-semibold text-indigo-800 mb-4">
                            
                </h2>
                    <table className="text-center">
                        <tbody >
                            <tr>
                                <td onClick={(e) =>{setTab("Seguidos");setMostrar(true)}}>
                                    <p className="p-5 pb-0 text-lg">Seguidos</p>
                                    <p className="text-2xl">{usuario?.seguidos?.length || 0}</p>
                                    </td>
                                <td onClick={(e) =>{setTab("Seguidores");setMostrar(true)}}>
                                    <p className="p-5 pb-0 text-lg">Seguidores</p>
                                    <p className="text-2xl">{usuario?.seguidores?.length || 0}</p>
                                </td>
                                <td onClick={(e) =>{setTab("Quedadas");setMostrar(true)}}>
                                    <p className="p-5 pb-0 text-lg">Quedadas</p>
                                    <p className="text-2xl">{usuario?.quedadasCreadas?.length || 0}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                <p className="text-gray-700 mb-6">
                    Estep Bilişim / Software Developer
                </p>
               
              
                <h2 className="text-xl font-semibold text-indigo-800 mb-4">Contact Information</h2>
                <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-800 " viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        john.doe@example.com
                    </li>
                    <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-800" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        +1 (555) 123-4567
                    </li>
                    <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-800 0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        San Francisco, CAa
                    </li>
                </ul>
            </div>
        </div>

    </ProtectedRoute>

    )
}
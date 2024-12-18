"use client";
import {fetchUsuarioById, fetchUsuarioByUsername} from "@/app/lib/usuarios";
import { useParams} from "next/navigation";
import { useEffect, useState } from "react"
import { ProtectedRoute } from "../protectedRoutes";


export default function perfilUsuario(){
    const [usuario,setUsuario] = useState({})
    const [seguidos,setSeguidos] = useState({})
    const [seguidores,setSeguidores] = useState({})
    const [quedadasCreadas,setQuedadasCreadas] = useState({})
    const [lista,setLista] = useState({})
    const [mostrar,setMostrar] = useState(false)
    const params = useParams()
    const {username} = params

    const buscarUsuario = async (usuario) =>{
        const username = {
            username: usuario
        }
        if (usuario) {
            try {
                const response = await fetchUsuarioByUsername(username)
                return response
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    const guardarSeguidosSeguidores = async (usuario) =>{
        let seguidos = [{}]
        let seguidores = [{}]
        let quedadasCreadas = [{}]
        try {
            if (usuario) {
                if (usuario.seguidos != undefined) {
                    usuario.seguidos.forEach(async (e) =>{
                        const response = await fetchUsuarioById(e)
                        seguidos.push(response)
                    })
                }

                if (usuario.seguidores != undefined) {
                    usuario.seguidores.forEach(async (e) =>{
                        const response = await fetchUsuarioById(e)
                        seguidores.push(response)
                    })
                }

                if (usuario.quedadasCreadas != undefined) {
                    usuario.quedadasCreadas.forEach(async (e) =>{
                        const response = await fetchUsuarioById(e)
                        quedadasCreadas.push(response)
                    })
                }
                
                setSeguidos(seguidos)
                setSeguidores(seguidores)
                setQuedadasCreadas(quedadasCreadas)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const mostrarSeguidosSeguidores = (lista) =>{
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50"> 
                <div className=" rounded-lg shadow-lg p-6 w-1/3 dark:bg-gray-800 bg-gray-200"> 
                    <h2 className="text-xl font-bold mb-4">Título del Popup</h2> 
                    <p className="mb-4">Este es el contenido del popup. Puedes incluir cualquier cosa aquí.</p> 
                    <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={(e) => setMostrar(false)}>Cerrar</button> 
                </div>
            </div>
        )
    }

    useEffect(() =>{
        
        if (username) {
            setUsuario(buscarUsuario(username))
        }
        
    },[username])
    
    useEffect(() =>{
        
        if (usuario) {
            guardarSeguidosSeguidores(usuario)
        }
        
    },[usuario])

    return (

        <ProtectedRoute>
        <div className="flex flex-col md:flex-row pt-10">
            <div className="md:w-1/3 text-center mb-8 md:mb-0">
                <img src="https://i.pravatar.cc/300" alt="Profile Picture" className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-orange-400 transition-transform duration-300 hover:scale-105"/>
                <button className="mt-4 font-bold text-orange-400 bg-transparent dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors duration-300 ring ring-orange-400 hover:ring-orange-400">Edit Profile</button>
            </div>
            {mostrar && mostrarSeguidosSeguidores(lista)}
            <div className="md:w-2/3 md:pl-8">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-300 mb-2">{usuario.username}</h1>
                <p className="text-gray-600 mb-6 text-lg">{usuario.nombre} {usuario.apellido}</p>

                <h2 className="text-xl font-semibold text-indigo-800 mb-4">
                            
                </h2>
                    <table className="text-center">
                        <tbody >
                            <tr>
                                <td onClick={(e) =>{setMostrar(true);setLista(seguidos)}}>
                                    <p className="p-5 pb-0 text-lg">Seguidos</p>
                                    <p className="text-2xl">{usuario?.seguidos?.length || 0}</p>
                                    </td>
                                <td onClick={(e) =>{setMostrar(true);setLista(seguidores)}}>
                                    <p className="p-5 pb-0 text-lg">Seguidores</p>
                                    <p className="text-2xl">{usuario?.seguidores?.length || 0}</p>
                                </td>
                                <td onClick={(e) =>{setMostrar(true);setLista(quedadasCreadas)}}>
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
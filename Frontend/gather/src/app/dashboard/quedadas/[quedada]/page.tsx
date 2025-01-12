"use client";
import { apuntarse, deleteQuedada, fetchQuedadaById } from "@/app/lib/quedadas"
import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { ProtectedRoute } from "../../protectedRoutes"
import { fetchUsuarioById, verificarId } from "@/app/lib/usuarios"
import Link from "next/link";
import EditarGather from "./editarQuedada";
import { buscarUsuarioId, fetchUsuarios, verificar } from "@/app/funciones";
import MapComponent from "@/app/maps";



export default function verQuedada (){
    const router = useRouter()
    const params = useParams()
    const {quedada} = params
    const [mostrarQuedada,setMostrarQuedada] = useState({})
    const [mostrarAsistentes,setMostrarAsistentes] = useState([])
    const [usuarioLogueado,setUsuarioLogueado] = useState({})
    const [usuarioQuedada,setUsuarioQuedada] = useState({})
    const [editar,setEditar] = useState(false)

    const buscarQuedada = async (quedada) =>{
        try {
            const response = await fetchQuedadaById(quedada)
            if (response != null) {
               return response 
            } else {
                router.push('/dashboard')
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const conseguirAsistentes = async (quedada) =>{
        if (quedada.usuariosAsistentes && quedada.usuariosAsistentes.length > 0) { 
            const UsuariosData = await fetchUsuarios(quedada.usuariosAsistentes); 
            
            setMostrarAsistentes(UsuariosData)
        } else { 
            setMostrarAsistentes([]); 
        } 
    }

    const eliminarQuedada = async (id) =>{
        try {
            const response = await deleteQuedada(id,usuarioLogueado._id)
            alert("Quedada Eliminada")
            router.push("/dashboard")
        } catch (error) {
            console.log(error.message)
        }
    }

    const botonApuntarse = async (desapuntarse) =>{
        try {
            const response = await apuntarse(usuarioLogueado._id,mostrarQuedada._id,desapuntarse)
            
        } catch (error) {
            console.log(error.message)
        }
    }

    

    useEffect(() =>{
        if (quedada) {
            const fetchAndSetQuedada = async () => {
                const Quedada = await buscarQuedada(quedada);
                const User = await buscarUsuarioId(Quedada.usuario);
                setMostrarQuedada(Quedada);
                setUsuarioQuedada(User);
                conseguirAsistentes(Quedada)
            };
            fetchAndSetQuedada();
            const token = sessionStorage.getItem("token");
            if (token) {
                verificar(token).then(dato =>{
                    buscarUsuarioId(dato.usuario.id).then(dato =>{
                        setUsuarioLogueado(dato)
                    })
                    
                })
            }else{
                router.push("/")
            }
        }
        
    },[])

    return (
        <ProtectedRoute>
            {editar && <EditarGather onClose={() => setEditar(false)}/>}
            <div className="p-5 text-black dark:text-gray-200">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <b className="text-3xl border-r border-orange-400 pr-2">{mostrarQuedada.nombre}</b> <b className="text-xl ml-2">{mostrarQuedada.deporte}</b> 
                        <p className="mt-2">Creada por <b className="ml-2 shadow-xl bg-[#34425b] p-2 rounded hover:bg-orange-400 cursor-alias">{usuarioQuedada.username}</b></p>
                    </div>
                    <div>              
                        <div className={`mr-4 rounded-3xl p-2 px-4 text-black ${mostrarQuedada.estado == "En curso" ? "bg-yellow-400" : (mostrarQuedada.estado == "Finalizada" ? "bg-red-400" : "bg-green-400")}`}>
                            {mostrarQuedada.estado}
                        </div>                   
                    </div>
                </div>
                <div className="flex items-center justify-between text-xl p-4">
                        <table className="text-center w-full">
                            <tbody>
                                <tr>
                                    <td className="p-2">Fecha Programada</td>
                                    <td className="p-2">Hora de inicio</td>
                                    <td className="p-2">Hora de finalizacion</td>
                                </tr>
                                <tr>
                                    <td className="p-2"><b className="ml-2 shadow-xl bg-[#34425b] p-2 rounded">{mostrarQuedada.fecha}</b></td>
                                    <td className="p-2"><b className="ml-2 shadow-xl bg-[#34425b] p-2 rounded">{mostrarQuedada.horaInicio}</b></td>
                                    <td className="p-2"><b className="ml-2 shadow-xl bg-[#34425b] p-2 rounded">{mostrarQuedada.horaFin}</b></td>
                                </tr>
                            </tbody>
                        </table>
                </div>
                <div className="flex items-center justify-between text-xl p-4">
                        <table className="text-center w-full">
                            <tbody>
                                <tr>
                                    <td className="p-2">Minimo de Asistentes</td>
                                    <td className="p-2">Maximo de Asistentes</td>
                                    <td className="p-2">Usuarios apuntados</td>
                                </tr>
                                <tr>
                                    <td className="p-2"><b className="ml-2 shadow-xl bg-[#34425b] p-2 rounded">{mostrarQuedada.minAsistentes}</b></td>
                                    <td className="p-2"><b className="ml-2 shadow-xl bg-[#34425b] p-2 rounded">{mostrarQuedada.maxAsistentes}</b></td>
                                    <td className="p-2"><b className="ml-2 shadow-xl bg-[#34425b] p-2 rounded">{mostrarQuedada?.usuariosAsistentes?.length || 0}</b></td>
                                </tr>
                            </tbody>
                        </table>
                </div>
                <div className="items-center justify-center text-xl p-4 ">
                    <div className="items-center justify-center text-xl p-4 w-full">
                        <div className="flex items-center justify-center"><h1 >Lugar:</h1><b className="ml-2 shadow-xl bg-[#34425b] p-2 rounded">{mostrarQuedada.lugar}</b></div>
                        
                        <div className="p-2">
                            
                            {<MapComponent direccion={mostrarQuedada.lugar}/>}
                        </div>
                    </div>
                    <div className="items-center justify-center text-xl p-4 w-full">
                        <div className="flex items-center justify-center"><h1 className="p-2">Apuntados</h1></div>
                        
                        <div className="overflow-y-auto border p-2 max-h-44">{mostrarAsistentes.length === 0 ? ( <p>No hay seguidores</p> ) : (
                                 mostrarAsistentes.map(usuario => (
                                    <div key={usuario._id} className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-700 hover:text-black">
                                        <Link  href={`/dashboard/user/${usuario.username}`}>
                                        <div className="flex items-center">
                                            <img className="rounded-full h-10 w-10" src="https://loremflickr.com/g/600/600/girl"/>
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
                        </div>
                    </div>

                </div>
                <div className="flex items-center justify-between text-xl p-4">
                    {mostrarQuedada.estado == "Inscripción Abierta" ? (
                    mostrarQuedada.usuariosAsistentes?.includes(usuarioLogueado._id) ? (
                        <button onClick={() => {botonApuntarse(true),window.location.reload()}} type="submit" className="flex items-center h-8 m-2 p-5 text-md font-bold text-gray-800 bg-orange-400 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                            Desapuntarse
                        </button>
                    ) : (
                        <button onClick={() => {botonApuntarse(false),window.location.reload()}} type="submit" className="flex items-center h-8 m-2 p-5 text-md font-bold text-gray-800 bg-orange-400 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                            Apuntarse
                        </button>
                    )) : ""
                    }
                    {usuarioQuedada._id != usuarioLogueado._id ? "" : (
                        <button onClick={() => setEditar(true)}type="submit" className="flex items-center h-8 m-2 p-5 text-md font-bold text-gray-800 bg-orange-400 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            Editar
                        </button> 
                    )}
                    {usuarioQuedada._id != usuarioLogueado._id ? "" : (
                        <button onClick={() => eliminarQuedada(mostrarQuedada._id)} type="submit" className="flex items-center h-8 m-2 p-5 text-md font-bold text-gray-800 bg-orange-400 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            Eliminar
                        </button>
                    )}
                </div>
            </div>
            
        </ProtectedRoute>
    )

}
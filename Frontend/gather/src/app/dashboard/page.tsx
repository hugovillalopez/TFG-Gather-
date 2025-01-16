"use client";
import {useEffect, useState } from "react"

import { fetchQuedadaById, fetchQuedadasUsuarios } from "../lib/quedadas";
import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
import { buscarUsuarioId, verificar } from "../funciones";
import Image from "next/image";



export default function MainPage(){
    const [Quedada, setQuedada] = useState([]);
    const [mostrarQuedada, setMostrarQuedada] = useState([]);
        const [usuarioLogueado, setUsuarioLogueado] = useState([]);
        const [error, setError] = useState(null);
        const router = useRouter()
        const searchParams = useSearchParams();
        const siguiendo = searchParams.get('siguiendo');
        const quedadas = searchParams.get('quedadas');
        const apuntado = searchParams.get('apuntado');

        const getData = async () => {
            try {
                const [quedadasResponse] = await Promise.all([
                    fetchQuedadasUsuarios()
                    
                ]);
    
                if (quedadasResponse) {
                    setMostrarQuedada(quedadasResponse);
                    setQuedada(quedadasResponse)
                }
    
                
            } catch (error) {
                setError(error.message);
                console.error("Error fetching data:", error);
            }
            };
            const fetchQuedadas = async (quedadasIds) => { 
                    try { 
                        const responses = await Promise.all(quedadasIds.map(_id => fetchQuedadaById(_id))); 
                        return responses
                    } catch (error) { 
                        console.error('Error fetching usuarios:', error); 
                    } 
                }
                const conseguirQuedadas = async (usuario,creadas) =>{
                    if (creadas) {
                       if (usuario.quedadasCreadas && usuario.quedadasCreadas.length > 0) { 
                            const quedadasData = await fetchQuedadas(usuario.quedadasCreadas); 
                            setMostrarQuedada(quedadasData); 
                            setQuedada(quedadasData)
                        } else { 
                            setMostrarQuedada([]); 
                        }  
                    } else {
                        if (usuario.quedadasAsistidas && usuario.quedadasAsistidas.length > 0) { 

                            const quedadasData = await fetchQuedadas(usuario.quedadasAsistidas); 
                            setMostrarQuedada(quedadasData);
                            setQuedada(quedadasData) 
                        } else { 
                            setMostrarQuedada([]); 
                        }  
                    }
                    
            
                }

        const handleChange = (e) =>{
            const valor = e.target.value
            let listaOrdenada
            switch (valor) {
                case 'Fecha':
                    listaOrdenada = [...mostrarQuedada].sort((a,b) =>a.fecha > b.fecha ?  1 :  -1 )
                    setMostrarQuedada(listaOrdenada)
                    console.log(mostrarQuedada)
                    break;
                case 'FechaHora':
                    listaOrdenada = [...mostrarQuedada].sort((a,b) => a.fecha === b.fecha ? (a.horaInicio > a.horaInicio ? 1 : -1) : (a.fecha > b.fecha ?  1 :  -1  )  )
                    setMostrarQuedada(listaOrdenada)
                    break;
                default:
                    setMostrarQuedada(Quedada)
                    break;
            }
        }

        const handleChangeEstado = (e) =>{
            const valor = e.target.value
            let listaFiltrada
            switch (valor) {
                case 'Inscripción Abierta':
                    listaFiltrada = Quedada.filter((quedada) => quedada.estado == "Inscripción Abierta")
                    setMostrarQuedada(listaFiltrada)
                    break;
                case 'En Curso':
                    listaFiltrada = Quedada.filter((quedada) => quedada.estado == "En Curso")
                    setMostrarQuedada(listaFiltrada)
                    break;
                case 'Finalizada':
                    listaFiltrada = Quedada.filter((quedada) => quedada.estado == "Finalizada")
                    setMostrarQuedada(listaFiltrada)
                    break;
                default:
                    setMostrarQuedada(Quedada)
                    break;
            }
        }
    
        useEffect(() => {
            
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
            
            
        }, []);

        useEffect(() => {

            if (Object.keys(usuarioLogueado).length != 0) {
                if(quedadas){
                    conseguirQuedadas(usuarioLogueado,true)
                }
                if(siguiendo){
                    if (usuarioLogueado.seguidos.length !== 0) {
                        getData()
                        const quedadasSiguiendo = mostrarQuedada.filter(quedada => usuarioLogueado.seguidos.includes(quedada.usuario))
                        setMostrarQuedada(quedadasSiguiendo)
                    }else{
                        setMostrarQuedada([])
                    }
                    
                }
                if (apuntado) {
                    conseguirQuedadas(usuarioLogueado,false)
                }
                if(!quedadas && !siguiendo && !apuntado){
                    getData();
                
                }
            }
            
        }, [usuarioLogueado, quedadas, siguiendo, apuntado]);

        
    
        return (
            <div className="items-center justify-center text-center text-gray-800 dark:text-gray-100">
                <div className="md:flex items-center justify-center">
                    <div className="m-2">
                        <select onChange={handleChange} name="visibilidad" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500">
                            <option value="" hidden>Ordenar por</option>
                            <option value="">No ordenar</option>
                            <option value="Fecha">Fecha</option>
                            <option value="FechaHora">Fecha y Hora</option>
                        </select>
                    </div>
                    <div className="m-2">
                        <select onChange={handleChangeEstado} name="visibilidad" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500">
                            <option value="" hidden>Mostrar por estado</option>
                            <option value="">No ordenar</option>
                            <option value="Inscripción Abierta">Inscripción Abierta</option>
                            <option value="En Curso">En Curso</option>
                            <option value="Finalizada">Finalizada</option>
                        </select>
                    </div>
                    
                    
                </div>
                <div>
                {error && <p>Error: {error}</p>}
                
                {mostrarQuedada.length === 0 ? (<p>No hay quedadas</p>) : (mostrarQuedada.map((quedada) => (
                    
                    <div key={quedada._id} className="rounded shadow-xl m-5 dark:bg-[#252f41] bg-[#f4f4f4] justify-between">
                        <div className="items-center justify-between flex text-left py-2 border-b border-orange-400">
                            <div>
                                <Link href={`/dashboard/user/${quedada.user.username}`}>
                                    <Image width="40" height="40" src={quedada.user.foto} alt="avatar" className=" m-1 inline-block relative object-cover object-center !rounded-full w-8 h-8" />
                                    {quedada.user.username}
                                </Link>
                            </div>
                            <div className={`mr-4 rounded-3xl p-2 px-4 text-black text-sm lg:text-md ${quedada.estado == "En curso" ? "bg-yellow-400" : (quedada.estado == "Finalizada" ? "bg-red-400" : "bg-green-400")}`}>
                            {quedada.estado}
                            </div>
                        </div>
                        <div>
                            <div className="pt-2 items-center justify-center lg:flex">
                                <div className="pr-4 text-xl">{quedada.nombre}</div>
                                <div className="text-lg text-gray-500">{quedada.deporte}</div>
                            </div>
                            <div>
                                <div className="lg:flex items-center justify-center py-4">
                                    <div className="lg:pr-4 mb-2 lg:mb-0">{quedada.lugar}</div>
                                    <div ><b className="shadow-xl dark:bg-[#34425b] bg-gray-300 p-1 rounded">{quedada.fecha}</b></div>
                                </div>
                                <div className="lg:flex items-center justify-center">
                                    <div className="mb-2 lg:mb-0">Hora de Inicio:<b className="ml-1 lg:mr-10 shadow-xl dark:bg-[#34425b] bg-gray-300 p-1 rounded">{quedada.horaInicio}</b></div>
                                    <div>Hora Finalizacion:<b className="ml-1 shadow-xl dark:bg-[#34425b] bg-gray-300 p-1 rounded">{quedada.horaFin}</b></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center py-4">
                            <Link href={`/dashboard/quedadas/${quedada._id}`} className="px-5 py-3 leading-5 text-black font-bold transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-800">Ver detalles</Link>
                            
                        </div>
                    </div>
                
                )))}
                </div>
            </div>
            
        )
    }

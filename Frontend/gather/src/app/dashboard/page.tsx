"use client";
import { FC, useEffect, useState } from "react"

import { fetchQuedadaById, fetchQuedadas, fetchQuedadasUsuarios } from "../lib/quedadas";
import Link from "next/link";
import { fetchUsuarioById, verificarId } from "../lib/usuarios";
import { useRouter, useSearchParams } from "next/navigation";
import { buscarUsuarioId, verificar } from "../funciones";



export default function MainPage(){
    const [Quedada, setQuedada] = useState([]);
    const [mostrarQuedada, setMostrarQuedada] = useState([]);
        const [usuarioLogueado, setUsuarioLogueado] = useState([]);
        const [error, setError] = useState(null);
        const router = useRouter()
        const searchParams = useSearchParams();
        const siguiendo = searchParams.get('siguiendo');
        const quedadas = searchParams.get('quedadas');

        const getData = async () => {
            try {
                const [quedadasResponse] = await Promise.all([
                    fetchQuedadasUsuarios()
                    
                ]);
    
                if (quedadasResponse) {
                    setMostrarQuedada(quedadasResponse);
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
                const conseguirQuedadas = async (usuario) =>{
                    if (usuario.quedadasCreadas && usuario.quedadasCreadas.length > 0) { 
                        const quedadasData = await fetchQuedadas(usuario.quedadasCreadas); 
                        setMostrarQuedada(quedadasData); 
                    } else { 
                        setMostrarQuedada([]); 
                    } 
            
                }

                
    
        useEffect(() => {
            const fetchData = async () =>{
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
            fetchData()
            
        }, []);

        useEffect(() => {

            if (usuarioLogueado) {
                if(quedadas){
                    conseguirQuedadas(usuarioLogueado)
                }
                if(siguiendo){
                    if (usuarioLogueado.seguidos.length !== 0) {
                        getData()
                        const quedadasSiguiendo = mostrarQuedada.filter(quedada => usuarioLogueado.seguidos.includes(quedada.usuario))
                        console.log(quedadasSiguiendo) 
                        setMostrarQuedada(quedadasSiguiendo)
                    }else{
                        setMostrarQuedada([])
                    }
                    
                }
                if(!quedadas && !siguiendo){
                    getData();
                
                }
            }
            
        }, [usuarioLogueado, quedadas, siguiendo]);

        
    
        return (
            <div className="items-center justify-center text-center text-gray-800 dark:text-gray-100">
                {error && <p>Error: {error}</p>}
                
                {mostrarQuedada.length === 0 ? (<p>No hay quedadas</p>) : (mostrarQuedada.map((quedada) => (
                    
                    <div key={quedada._id} className="rounded shadow-xl m-5 dark:bg-[#252f41] bg-[#f4f4f4] justify-between">
                        <div className="items-center justify-between flex text-left py-2 border-b border-orange-400">
                            <div>
                                <img src="/images/gatherLogo.png" alt="avatar" className="inline-block relative object-cover object-center !rounded-full w-8 h-8" />
                                {quedada.user.username}
                            </div>
                            <div className={`mr-4 rounded-3xl p-2 px-4 text-black ${quedada.estado == "En curso" ? "bg-yellow-400" : (quedada.estado == "Finalizada" ? "bg-red-400" : "bg-green-400")}`}>
                            {quedada.estado}
                            </div>
                        </div>
                        <div>
                            <div className="pt-2 items-center justify-center flex">
                                <div className="pr-4 text-xl">{quedada.nombre}</div>
                                <div className="text-lg text-gray-500">{quedada.deporte}</div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center py-4">
                                    <div className="pr-4">{quedada.lugar}</div>
                                    <div className="shadow-xl bg-[#34425b] p-1 rounded">{quedada.fecha}</div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="mr-10 shadow-xl bg-[#34425b] p-1 rounded">{quedada.horaInicio}</div>
                                    <div className="shadow-xl bg-[#34425b] p-1 rounded">{quedada.horaFin}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center py-4">
                            <Link href={`/dashboard/quedadas/${quedada._id}`} className="px-5 py-3 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-800">Ver detalles</Link>
                            
                        </div>
                    </div>
                
                )))}
                
            </div>
            
        )
    }

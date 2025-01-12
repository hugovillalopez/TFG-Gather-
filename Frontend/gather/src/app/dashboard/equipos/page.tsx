"use client";
import { buscarUsuarioId, conseguirEquipos, verificar, } from "@/app/funciones";
import { fetchEquipoById } from "@/app/lib/equipos";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CrearEquipo from "./crearEquipo";


export default function Equipos(){
    const [usuarioLogueado,setUsuarioLogueado] = useState({})
    const [Equipos,setEquipos] = useState([])
    const [mostrarCrear,setMostrarCrear] = useState(false)
    const router = useRouter()

    

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
        conseguirEquipos(usuarioLogueado).then(equipos => setEquipos(equipos))
        
    },[usuarioLogueado])

    return (
        <div className="p-5 text-gray-800 dark:text-gray-200">
            {mostrarCrear && <CrearEquipo onClose={() => setMostrarCrear(false)}/>}
            <div className="flex items-center justify-between">
                <div className="text-xl">Tus Equipos</div>
                <div className="flex justify-center">
                    <button onClick={() => setMostrarCrear(true)}className="flex px-2 py-3 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Crear Equipo
                    </button>
                </div>
            </div>
            <div>
                {Equipos.length === 0 ? (<p>No estas unido a ningun equipo</p>) : (Equipos.map((equipo) =>(
                    <div key={equipo.nombre} className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-700 hover:text-black">
                        <Link href={`/dashboard/equipos/${equipo.nombre.replace(/ /g, '-')}`}  className="w-full">
                        <div className="flex items-center">
                            <img className={`rounded-full h-10 w-10 p-1 ${!equipo.foto ? "border" : ""}`} src={equipo.foto || "/images/users.webp"}/>
                            <div className="ml-2 flex flex-col">
                                <div className="text-slate-800 dark:text-gray-300 font-semibold"> {equipo.nombre}</div>
                            </div>
                        </div>
                        </Link>
                    </div>
                )))}
            </div>
            
        </div>
    )
}


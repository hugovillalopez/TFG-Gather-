"use client";
import {fetchUsuarioByUsername} from "@/app/lib/usuarios";
import { useParams} from "next/navigation";
import { useEffect, useState } from "react"


export default function perfilUsuario(){
    const [usuario,setUsuario] = useState({})
    const params = useParams()
    const {username} = params

    const buscarUsuario = async (usuario) =>{
        const username = {
            username: usuario
        }
        if (usuario) {
            try {
                const response = await fetchUsuarioByUsername(username)
                console.log(response)
                setUsuario(response)
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    useEffect(() =>{
        
        if (username) {
            buscarUsuario(username)
            
        }
        
    },[username])

    return (

        <div className=" flex items-center gap-4">
            <div className=" flex items-center gap-4 mt-4 ml-">
                <img src="../images/gatherLogo.png" alt="avatar" className="inline-block relative object-cover object-center !rounded-full w-80 h-80" />
                <div className="justify-start">
                <h1 className="text-slate-800 dark:text-gray-300 font-semibold text-5xl">
                    {usuario.username}
                </h1>
                <p className="text-slate-600 text-sm dark:text-gray-500">
                    {usuario.nombre} {usuario.apellido}
                </p>
                </div>
                
            </div>
        </div>

    )
}
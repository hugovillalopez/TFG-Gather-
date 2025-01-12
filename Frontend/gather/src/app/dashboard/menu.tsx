"use client";

import Link from "next/link";
import CrearGather from "./crearGather";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";


export default function Menu(){
    let pathname = usePathname()
    const [crear,setCrear] = useState(false)
    const router = useRouter()
    return(
        <div className="flex flex-1 bg-trasparent justify-center">
    <div className="hidden md:flex md:w-60 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto ">

            <div className="flex flex-col flex-1 px-3">
                <div className="space-y-4">
                    <nav className="flex-1 space-y-2">
                    <Link href="/dashboard" className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group ${pathname == "/dashboard" ? "bg-orange-500" : "bg-transparent" }`}>
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </Link>

                        <Link href="/dashboard?siguiendo=true" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Siguiendo
                        </Link>

                        <Link href="/dashboard/explorar" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                        <svg className="size-6 flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                            Explorar
                        </Link>

                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="size-6 flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>

                            Chats
                            
                        </a>
                    
                        <Link href="/dashboard/equipos" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="size-6 flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>
                            Equipos
                        </Link>

                        <Link href="/dashboard?quedadas=true" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="size-6 flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                            </svg>
                            Mis Gathers
                        </Link>

                        <a onClick={() => setCrear(true)} className="flex items-center px-4 py-2.5 transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                        <svg className="size-6 flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                            Crear Gather
                            {/*<svg className="w-4 h-6 ml-auto text-gray-400 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>*/}
                        </a>
                        {crear && <CrearGather onClose={() => setCrear(false)}/>}
                    
                        <a onClick={() =>{sessionStorage.clear(),router.push("/")}} className="text-red-500 flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:text-white rounded-lg hover:bg-orange-500 group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 flex-shrink-0 w-5 h-5 mr-4 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                            Cerrar Sesion
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}
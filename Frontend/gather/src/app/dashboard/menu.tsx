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
        <div className="flex flex-1 lg:fixed lg:bg-transparent lg:dark:bg-transparent bg-gray-200 dark:bg-gray-800 justify-center">
    <div className="lg:flex w-auto md:flex-col">
        <div className="flex flex-col flex-grow pt-5  ">

            <div className="flex flex-col flex-1 px-3 space-y-4">
                    <nav className="flex-1 space-y-2 flex lg:block">
                        <Link href="/dashboard" className={`flex items-center sm:px-4 px-2 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group ${pathname == "/dashboard" ? "bg-orange-500" : "bg-transparent" }`}>
                            <svg className="flex-shrink-0 w-5 h-5 lg:mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <p className="hidden lg:block">Home</p>
                        </Link>
                        
                        <Link href="/dashboard/explorar" className="flex items-center sm:px-4 px-2 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                        <svg className="size-6 flex-shrink-0 w-5 h-5 lg:mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <p className="hidden lg:block">Explorar</p>
                        </Link>

                        <Link href="/dashboard?siguiendo=true" className="flex items-center sm:px-4 px-2 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="flex-shrink-0 w-5 h-5 lg:mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                            </svg>
                            <p className="hidden lg:block">Siguiendo</p>
                        </Link>
                        
                        <Link href="/dashboard?apuntado=true" className="flex items-center sm:px-4 px-2 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 flex-shrink-0 w-5 h-5 lg:mr-4 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                            <p className="hidden lg:block">Apuntadas</p>
                        </Link>
                        
                        <Link href="/dashboard?quedadas=true" className="flex items-center sm:px-4 px-2 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="size-6 flex-shrink-0 w-5 h-5 lg:mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                            </svg>
                            <p className="hidden lg:block">Mis Quedadas</p>
                        </Link>

                        <Link href="/dashboard/equipos" className="flex items-center sm:px-4 px-2 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="size-6 flex-shrink-0 w-5 h-5 lg:mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>
                            <p className="hidden lg:block">Equipos</p>
                        </Link>

                        

                        <a onClick={() => setCrear(true)} className="flex items-center sm:px-4 px-2 py-2.5 transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                        <svg className="size-6 flex-shrink-0 w-5 h-5 lg:mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                            <p className="hidden lg:block">Crear Gather</p>
                            {/*<svg className="w-4 h-6 ml-auto text-gray-400 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>*/}
                        </a>
                        {crear && <CrearGather onClose={() => setCrear(false)}/>}
                    
                        <a onClick={() =>{sessionStorage.clear(),router.push("/")}} className="text-red-500 flex items-center sm:px-4 px-2 py-2.5 text-sm font-medium transition-all duration-200 hover:text-white rounded-lg hover:bg-orange-500 group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 flex-shrink-0 w-5 h-5 lg:mr-4 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                            <p className="hidden lg:block">Cerrar Sesion</p>
                        </a>
                    </nav>
                </div>
            </div>
    </div>
</div>
    )
}
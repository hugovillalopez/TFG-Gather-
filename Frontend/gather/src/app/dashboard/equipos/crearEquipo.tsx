"use client";

import { buscarUsuarioId, convertirAFormData, verificar } from "@/app/funciones";
import { createEquipo } from "@/app/lib/equipos";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CrearEquipo({onClose}){
    const [usuarioLogueado,setUsuarioLogueado] = useState({})
    const [errores,setErrores] = useState({})
    const [Img,setImg] = useState('No hay imagen seleccionada')
    const formRef = useRef(null)
    const router = useRouter()
    const [mostrarErrores,setMostrarErrores] = useState(false)

    const crear = async (equipo) =>{
        try {
            const response = await createEquipo(equipo)
            console.log(response)
            onClose(response)
        } catch (error) {
            console.log(error.message)
        }
    }

    const Validar = (e) =>{
        e.preventDefault()
        e.target.blur()

        const form = formRef.current

        const datos = {
            nombre: form.nombre.value,
            creador: usuarioLogueado._id
        }

        let error = false
        let erroresTemp = {}

        if(datos.nombre.match(/^[A-Za-z\d@$!%*#?&-+\s]+$/) == null || datos.nombre == ""){
            error = true
            form.nombre.placeholder = `Campo NOMBRE vacio`
            erroresTemp.nombre = "Campo NOMBRE no correcto o vacio"
        }

        if (!error) {
            if (form.fotoEquipo.files[0]) {
                datos.fotoEquipo = form.fotoEquipo.files[0]
            }
            const formData = convertirAFormData(datos)
            crear(formData)
                
        }else{
            setErrores(erroresTemp)
            setMostrarErrores(true)
        }

    }

    useEffect(()=>{
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
    },[])

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="overflow-auto rounded-lg shadow-lg p-6 w-1/3 dark:bg-gray-800 bg-gray-100 h-5/6 lg:w-3/6 w-5/6 text-gray-800 dark:text-gray-300">
                    <div className="mb-5 flex flex-row items-center w-full justify-between">
                        <div className="mb-2 flex flex-row items-center">
                            <h1 className="text-xl font-bold text-black capitalize dark:text-gray-200">Crear Equipo</h1>
                        </div>
                        <div className="mb-2 flex flex-row items-center">
                            <button className="rounded " onClick={onClose}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button> 
                        </div>
                    </div> 
                    <div>
                    {Object.keys(errores).length != 0 && mostrarErrores &&
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">ERROR:</strong>
                            <span className="block"><ol>
                                    {Object.keys(errores).map((e) =>(
                                        <li key={e}>{errores[e]}</li>
                                    ))}
                                </ol></span>
                            <span onClick={() => setMostrarErrores(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                            </span>
                        </div>
                    }
                        <form ref={formRef} onSubmit={Validar} encType="multipart/form-data">
                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="nombre">Nombre</label>
                                    <input name="nombre" type="text" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.nombre ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300  focus:border-orange-400 dark:focus:border-orange-400 focus:border-2 border-2  focus:outline-none  ring-orange-100 placeholder-red-500`}/>
                                </div>
                                <div>
                                    <label className="text-black dark:text-gray-200" >Foto de equipo</label>
                                    <label className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white  rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 hover:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`} htmlFor="fotoEquipo">{Img}</label>
                                    <input onChange={(e) =>{
                                        const file = e.target.files ? e.target.files[0] : null;
                                        setImg(file ? file.name : 'No hay imagen seleccionada')
                                    }} name="fotoEquipo" accept="image/*" id="fotoEquipo" type="file" className={`hidden block w-full px-4 py-2 mt-2 text-gray-700 bg-white rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                                </div>
                            

                            <div className="flex justify-center mt-6">
                                <button className="text-black px-10 py-3 font-bold leading-5 transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-800">Crear Equipo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )

}
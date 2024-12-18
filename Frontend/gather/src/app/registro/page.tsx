"use client";
import { createUsuarios } from "@/app/lib/usuarios";
import { Card, MantineProvider } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export default function Registrarse() {

    const formRef = useRef(null)
    const [errores,setErrores] = useState({})
    const router = useRouter()

    

    const data = async (usuario) =>{
        try{
            const registro = await Promise.all([createUsuarios(usuario)])

            if (registro) {
                console.log(registro)
                router.push("/")
            }
        }catch(error){
            console.log(error.mensage)
        }
    }

    
    
function Validar(e){
        e.preventDefault()
        e.target.blur()

        const form = formRef.current

        const datos = {
            nombre : form.nombre.value,
            apellido : form.apellido.value,
            fechaNacimiento : form.fechaNacimiento.value,
            numeroTlf : form.numeroTlf.value,
            username : form.username.value,
            correo : form.correo.value,
            password : form.password.value,
            confirmPassword : form.confirmPassword.value,
           }

           
        let error = false
        let erroresTemp = {}

        Object.keys(datos).forEach((e) =>{
            
            if (datos[e] == "") {
                error = true
                form[e].placeholder = "Este campo esta vacio"
                erroresTemp[e] = true
            }
        })

        setErrores(erroresTemp)

        
        if (!error && datos.confirmPassword == datos.password) {
                    data(datos)
        }else{
            alert("Error")
        }

    }


    return (
        <div>
<section className="max-w-4xl p-6 mx-auto bg-white-600 rounded-md shadow-md dark:bg-gray-800 mt-20 border border-orange-400 border-4">
    <h1 className="text-xl font-bold text-black capitalize dark:text-gray-200">Registro de sesión</h1>
    <form ref={formRef} onSubmit={Validar}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-black dark:text-gray-200" htmlFor="nombre">Nombre</label>
                <input name="nombre" type="text" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.nombre ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300  focus:border-orange-400 dark:focus:border-orange-400 focus:border-2 border-2  focus:outline-none  ring-orange-100 placeholder-red-500`}/>
            </div>

            <div>
                <label className="text-black dark:text-gray-200" htmlFor="apellido">Apellido</label>
                <input name="apellido" type="text" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.apellido ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
            </div>
            <div>
                <label className="text-black dark:text-gray-200" htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                <input name="fechaNacimiento" type="date" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.fechaNacimiento ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-400 dark:focus:border-orange-400 focus:border-2 border-2  focus:outline-none  ring-orange-100 placeholder-red-500`}/>
            </div>

            <div>
                <label className="text-black dark:text-gray-200" htmlFor="numeroTlf">Número de Teléfono</label>
                <input name="numeroTlf" type="text" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.numeroTlf ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
            </div>
            <div>
                <label className="text-black dark:text-gray-200" htmlFor="username">Username</label>
                <input name="username" type="text" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.username ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-400 dark:focus:border-orange-400 focus:border-2 border-2  focus:outline-none  ring-orange-100 placeholder-red-500`}/>
            </div>

            <div>
                <label className="text-black dark:text-gray-200" htmlFor="correo">Correo</label>
                <input name="correo" type="email" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.correo ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
            </div>

            <div>
                <label className="text-black dark:text-gray-200" htmlFor="password">Contraseña</label>
                <input name="password" type="password" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.password ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
            </div>

            <div>
                <label className="text-black dark:text-gray-200" htmlFor="confirmPassword">Confirmación de contraseña</label>
                <input name="confirmPassword" type="password" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.confirmPassword ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
            </div>

            {/*<div>
                <label className="text-black dark:text-gray-200" htmlFor="passwordConfirmation">Select</label>
                <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500">
                    <option>Surabaya</option>
                    <option>Jakarta</option>
                    <option>Tangerang</option>
                    <option>Bandung</option>
                </select>
            </div>
            <div>
                <label className="text-black dark:text-gray-200" htmlFor="passwordConfirmation">Date</label>
                <input ref={datos.date" type="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500"/>
            </div>*/}
        
            {/*<div>
                <label className="block text-sm font-medium text-white">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span className="">Upload a file</span>
                      <input ref={datos.file-upload" name="file-upload" type="file" className="sr-only"/>
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>*/}
        </div>

        <div className="flex justify-center mt-6">
            <button className="px-10 py-3 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-800">Save</button>
        </div>
    </form>
</section>

</div>
    )

}

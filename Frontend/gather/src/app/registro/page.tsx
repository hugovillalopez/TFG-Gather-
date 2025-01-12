"use client";
import { createUsuarios } from "@/app/lib/usuarios";
import { Card, MantineProvider } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { convertirAFormData } from "../funciones";
import { get } from "lodash";


export default function Registrarse() {

    const formRef = useRef(null)
    const [errores,setErrores] = useState({})
    const [mostrarErrores,setMostrarErrores] = useState(false)
    const [Img,setImg] = useState('No hay imagen seleccionada')
    const router = useRouter()
    const hoy = new Date(); 
    const hace15Anios = new Date(hoy.getFullYear() - 15, hoy.getMonth(), hoy.getDate()); 
    const hace100Anios = new Date(hoy.getFullYear() - 100, hoy.getMonth(), hoy.getDate()); 

    

    const data = async (usuario) =>{
        try{
            const registro = await Promise.all([createUsuarios(usuario)])

            if (registro) {
                console.log(registro)
                router.push("/")
            }
        }catch(error){
            const erroresTemp = {"ERROR":error.message}
            setErrores(erroresTemp)
            setMostrarErrores(true)
        }
    }

    
    
function Validar(e){
        e.preventDefault()
        e.target.blur()

        const form = formRef.current

        let datos = {
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
            
                switch (e) {
                    case 'nombre':
                        if(datos[e].match(/^[A-Z]{1}[a-z]+( [A-Z]{1}[a-z]+)*$/) == null || datos[e] == ""){
                            error = true
                            form[e].placeholder = `Campo ${e} vacio`
                            erroresTemp[e] = "Campo NOMBRE no correcto o vacio"
                        }
                        break;
                    case 'apellido':
                        if(datos[e].match(/^[A-Z]{1}[a-z]+( [A-Z]{1}[a-z]+)*$/) == null || datos[e] == ""){
                            error = true
                            form[e].placeholder = `Campo ${e} no correcto o vacio`
                            erroresTemp[e] = "Campo APELLIDO no correcto o vacio"
                        }
                        break;
                    case 'fechaNacimiento':
                        const fecha = new Date(datos[e])
                    if(fecha > hace15Anios && fecha < hace100Anios || datos[e] == ""){
                            error = true
                            form[e].placeholder = `Campo ${e} no correcto o vacio`
                            erroresTemp[e] = "Campo FECHA NACIMIENTO no correcto o vacio"
                        }  
                        break;
                    case 'numeroTlf':
                        if(datos[e].match(/^[6|7]{1}[0-9]{8}$/) == null || datos[e] == ""){
                            error = true
                            form[e].placeholder = `Campo ${e} no correcto o vacio`
                            erroresTemp[e] = "Campo NUMERO DE TELEFONO no correcto o vacio"
                        }
                        
                        break;
                    case 'username':
                        if(datos[e].match(/^[A-Za-z]{1}[A-Za-z0-9_]+$/) == null || datos[e] == ""){
                            error = true
                            form[e].placeholder = `Campo ${e} no correcto o vacio`
                            erroresTemp[e] = "Campo USERNAME no correcto o vacio"
                        }
                        break;
                    case 'correo':
                        if(datos[e].match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == null || datos[e] == ""){
                            error = true
                            form[e].placeholder = `Campo ${e} no correcto o vacio`
                            erroresTemp[e] = "Campo CORREO no correcto o vacio"
                        }
                        
                        break;
                    case 'password':
                        if(datos[e].match(/^[A-Za-z\d@$!%*#?&]+$/) == null || datos[e] == ""){
                            error = true
                            form[e].placeholder = `Campo ${e} no correcto o vacio`
                            erroresTemp[e] = "Campo CONTRASEÑA no correcto o vacio"
                        }
                        
                        break;
                    case 'confirmPassword':
                        if(datos[e].match(/^[A-Za-z\d@$!%*#?&]+$/) == null || datos[e] == ""){
                            error = true
                            form[e].placeholder = `Campo ${e} no correcto o vacio`
                            erroresTemp[e] = "Campo CONFIRMAR CONTRASEÑA no correcto o vacio"
                        }
                        
                        break;
                    default:
                        break;
                }
            
        })

        if (!error) {
            if (datos.confirmPassword == datos.password) {
                if (form.fotoPerfil.files[0]) {
                    datos.fotoPerfil = form.fotoPerfil.files[0]
                }
                const formData = convertirAFormData(datos)
                data(formData)
            }else{
                erroresTemp["Contraseña"] = "Los campos CONTRASEÑA y CONFIRMAR CONTRASEÑA no coinciden"
                setErrores(erroresTemp)
                setMostrarErrores(true)
            }
                    
        }else{
            setErrores(erroresTemp)
            setMostrarErrores(true)
        }

    }


    return (
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
            <section className="max-w-4xl p-6 mx-auto bg-white-600 rounded-md shadow-md dark:bg-gray-800 mt-20 border border-orange-400 border-4">
                <h1 className="text-xl font-bold text-black capitalize dark:text-gray-200">Registro de sesión</h1>
                <form ref={formRef} onSubmit={Validar} encType="multipart/form-data">
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
                            <input name="fechaNacimiento" min={hace100Anios.toISOString().split('T')[0]} max={hace15Anios.toISOString().split('T')[0]} type="date" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.fechaNacimiento ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-400 dark:focus:border-orange-400 focus:border-2 border-2  focus:outline-none  ring-orange-100 placeholder-red-500`}/>
                        </div>

                        <div>
                            <label className="text-black dark:text-gray-200" htmlFor="numeroTlf">Número de Teléfono</label>
                            <input name="numeroTlf" type="number" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.numeroTlf ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
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
                    
                    <div>
                            <label className="text-black dark:text-gray-200" >Foto de usuario</label>
                            <label className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white  rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 hover:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`} htmlFor="fotoUsuario">{Img}</label>
                            <input onChange={(e) =>{
                                const file = e.target.files ? e.target.files[0] : null;
                                setImg(file ? file.name : 'No hay imagen seleccionada')
                            }} name="fotoPerfil" accept="image/*" id="fotoUsuario" type="file" className={`hidden block w-full px-4 py-2 mt-2 text-gray-700 bg-white ${errores.confirmPassword ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button className="px-10 py-3 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-800">Registrar</button>
                    </div>
                </form>
            </section>

</div>
    )

}

"use client";
import { Button, Card, Grid, MantineProvider, rem, TextInput } from "@mantine/core";
import { FC, useRef, useState } from "react";
import '@mantine/core/styles.css'
import './globals.css'
import { loggear, verificarId } from "./lib/usuarios";
import { useRouter} from "next/navigation";
import Link from "next/link";



export default function Login(){
    
    const formRef = useRef(null)
    const [errores,setErrores] = useState({})
    const router = useRouter()
    //const [token,setToken] = useState('')

    const data = async (usuario) =>{
        try{
            const registro = await Promise.all([loggear(usuario)])

            if (registro) {
                return registro[0].token
            }
        }catch(error){
            console.log(error.message)
        }
    }

    function Loggear(e){
        e.preventDefault()
        e.target.blur()

        const datos = {
            username : formRef.current.username.value,
            password : formRef.current.password.value,
        }

        let error = false
        let erroresTemp = {}

        Object.keys(datos).forEach((e) =>{
            if (datos[e] == "") {
                error = true
                formRef.current[e].placeholder = "Este campo esta vacio"
                erroresTemp[e] = true
            }
        })

        setErrores(erroresTemp)

        if (!error) {
            data(datos)
            .then(token =>{
                const verificar = async (token)=> {
                try {
                    const v = await Promise.all([verificarId(token)])  
                    if (v) {
                        router.push('/dashboard')
                    }                  
                } catch (error) {
                    console.log(error.message)
                }
            }
                verificar(token)
            })
            
            
            
        }

    }

    return (
        
        <div className="h-screen md:flex overflow-hidden">
            <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
                <div>
                    <h1 className="text-white font-bold text-4xl font-sans">GoFinance</h1>
                    <p className="text-white mt-1">The most popular peer to peer lending at SEA</p>
                    <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
                </div>
            </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
            <form className="bg-white" ref={formRef} onSubmit={Loggear}>
                <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
                <div className={`flex items-center border-4 py-2 px-3 rounded-2xl mb-4 ${errores.username ? "border-red-300 dark:border-red-600 " : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                    <input className={`pl-2 outline-none border-none bg-white  text-black ${errores.username ? "placeholder-red-500" : ""}`} type="text" name="username" placeholder="Username" />
                </div>
                        
                <div className={`flex items-center border-4 py-2 px-3 rounded-2xl ${errores.password ? "border-red-300 dark:border-red-600" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <input className={`pl-2 outline-none border-none bg-white text-black ${errores.password ? "placeholder-red-500" : ""}`} type="password" id='' name="password" placeholder="Password" />
                </div>
                <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
                <Link href="/registro" className="border text-black"> Registrarse</Link>
            </form>
        </div>
    </div>
    )

}

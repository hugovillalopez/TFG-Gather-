"use client";

import { useRef } from "react";
import { olvidadaPassword } from "../lib/usuarios";


export default function OlvidadaPassword () {
    const formRef = useRef(null)

    const enviarCorreo = async (correo) =>{
        try {
            const response = await olvidadaPassword(correo)
            console.log(response)
        } catch (error) {
            console.log(error.message)
        }
    }

    const Validar = (e) =>{
        e.preventDefault()
        e.target.blur()

        const form = formRef.current

        if(form.correo.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == null || form.correo.value == ""){
            form.correo.placeholder = `Campo ${e} no correcto o vacio`
        } else {
            enviarCorreo(form.correo.value)
        }
    }

    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto bg-white-600 rounded-md shadow-md dark:bg-gray-800 mt-20 border border-orange-400 border-4">
                <h1 className="text-xl font-bold text-black capitalize dark:text-gray-200">Contraseña Olvidada?</h1>
                <form ref={formRef} onSubmit={Validar}>
                    <div>
                        <label className="text-black dark:text-gray-200" htmlFor="correo">Correo</label>
                        <input name="correo" type="email" required className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border  rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button className="px-10 py-3 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-800">Registrar</button>
                    </div>
                </form>
            </section>
        </div>
    )
}
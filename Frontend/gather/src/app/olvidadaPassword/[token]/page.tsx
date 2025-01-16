"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import {olvidadaPasswordToken } from "@/app/lib/usuarios";


export default function CambiarPassword () {
    const formRef = useRef(null)
    const params = useParams()
    const {token} = params

    const enviarPassword = async (contraseña) =>{
        try {
            const response = await olvidadaPasswordToken(token,contraseña)
            console.log(response)
        } catch (error) {
            console.log(error.message)
        }
    }

    const Validar = (e) =>{
        e.preventDefault()
        e.target.blur()

        const form = formRef.current

        if(form.password.value.match(/^[A-Za-z\d@$!%*#?&]+$/) == null || form.password.value == ""){
            form.password.placeholder = `Campo ${e} no correcto o vacio`
        }else {
            if (form.passwordConfirmation.value != "") {
                if (form.passwordConfirmation.value == form.password.value) {
                    enviarPassword(form.password.value)
                }else{
                    alert("No coinciden las dos contraseñas")
                }
            } else {
                alert("No has introducido la confirmacion de contraseña")
            }
        }
    }

    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto bg-white-600 rounded-md shadow-md dark:bg-gray-800 mt-20 border border-orange-400 border-4">
                <h1 className="text-xl font-bold text-black capitalize dark:text-gray-200">Contraseña Olvidada?</h1>
                <form ref={formRef} onSubmit={Validar}>
                    <div>
                        <label className="text-black dark:text-gray-200" htmlFor="password">Contraseña</label>
                        <input name="password" type="password" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                    </div>

                    <div>
                        <label className="text-black dark:text-gray-200" htmlFor="confirmPassword">Confirmación de contraseña</label>
                        <input name="confirmPassword" type="password" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button className="px-10 py-3 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-800">Cambiar Contraseña</button>
                    </div>
                </form>
            </section>
        </div>
    )
}
"use client";
import { buscarUsuario, buscarUsuarioId, convertirAFormData, verificar } from "@/app/funciones";
import { actualizarFotoUsuario, cambiarPassword, updateUsuario } from "@/app/lib/usuarios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"


export default function EditarPerfil({onClose}){
    const [usuarioLogueado,setUsuarioLogueado] = useState({})
    const [usuario1,setUsuario] = useState({})
    const params = useParams()
    const {username} = params
    const router = useRouter()
    const formRef = useRef(null)
    const formRefImg = useRef(null)
    const formPassword = useRef(null)
    const [errores,setErrores] = useState({})
    const [password,setPassword] = useState(false)
    const [editar,setEditar] = useState(false)
    const [foto,setFoto] = useState(false)
    const [Img,setImg] = useState('No hay imagen seleccionada')
    const [mostrarErrores,setMostrarErrores] = useState(false)
    const hoy = new Date(); 
    const hace15Anios = new Date(hoy.getFullYear() - 15, hoy.getMonth(), hoy.getDate()); 
    const hace100Anios = new Date(hoy.getFullYear() - 100, hoy.getMonth(), hoy.getDate()); 

    const data = async (usuario) =>{
            try{
                const registro = await Promise.all([updateUsuario(usuarioLogueado._id,usuario)])
    
                if (registro) {
                    onClose(registro[0])
                }
            }catch(error){
                console.log(error.mensage)
            }
        }

    const Validar = (e) =>{
        e.preventDefault()
        e.target.blur()

        const form = formRef.current

        const datos = {
            nombre: form.nombre.value,
            apellido : form.apellido.value,
            fechaNacimiento : form.fechaNacimiento.value,
            numeroTlf : form.numeroTlf.value,
            username : form.username.value,
            correo : form.correo.value,
        }

        let error = false
        const erroresTemp = {}

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
                default:
                    break;
            }
        
    })

        setErrores(erroresTemp)

        if (!error) {
            data(datos)
            if (username != datos.username) {
                window.location.href = `/dashboard/${datos.username}`
                
            }else{
                window.location.reload()
            }
        }else{
            setMostrarErrores(true)
}

    }

    const cambioContraseña = async (datos) =>{
        try {
            const response = await cambiarPassword(datos)
            setUsuarioLogueado(response)
            alert("Contraseña Cambiada")
            setPassword(false)
        } catch (error) {
            alert(error)
        }
    }

    const CambiarPassword = (e) =>{
        e.preventDefault()
        e.target.blur()

        const form = formPassword.current
        const datos = {
            password: form.password.value,
            newPassword: form.newPassword.value,
            confirmNewPassword: form.confirmNewPassword.value
        }

        let error = false

        Object.keys(datos).forEach((e) =>{
            switch (e) {
                case 'password':
                    if(datos[e].match(/^[A-Za-z\d@$!%*#?&]+$/) == null || datos[e] == ""){
                        error = true
                        form[e].placeholder = `Campo CONTRASEÑA ACTUAL no correcto o vacio`
                        
                    }
                    
                    break;
                case 'newPassword':
                    if(datos[e].match(/^[A-Za-z\d@$!%*#?&]+$/) == null || datos[e] == ""){
                        error = true
                        form[e].placeholder = `Campo CoNTRASEÑA NUEVA no correcto o vacio`
                        
                    }
                        
                        break;
                case 'confirmNewPassword':
                    if(datos[e].match(/^[A-Za-z\d@$!%*#?&]+$/) == null || datos[e] == ""){
                        error = true
                        form[e].placeholder = `Campo CONFIRMACION no correcto o vacio`
                        
                    }
                    
                    break;
                default:
                    break;
            }
        })

        if (!error) {
            if (datos.password != datos.newPassword) {
                if (datos.confirmNewPassword == datos.newPassword) {
                    cambioContraseña(datos)
                } else {
                    alert("La contraseña nueva y la confirmacion no coinciden")
                }
            } else {
                alert("La contraseña actual no puede ser la nueva")
            }
            
        }
    }

    const actualizarFoto = async (datos) =>{
        try {
            const response = await actualizarFotoUsuario(datos)
            onClose(response)
        } catch (error) {
            console.log(error.message)
        }
    }

    const ValidarImg = (e) =>{
        e.preventDefault()
        e.target.blur()

        const form = formRefImg.current

        if (form.foto.files[0]) {
            const datos = {
                idUsuario: usuarioLogueado._id,
                foto: form.foto.files[0]
            }
            const formData = convertirAFormData(datos)
            actualizarFoto(formData)
        } else {
            alert("Error no hay imagen")
        }
            
    }

    useEffect(() => {
        if (username) {
            const fetchAndSetUser = async () => {
                const user = await buscarUsuario(username);
                setUsuario(user);
                    
            };
            fetchAndSetUser();
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

            if (usuarioLogueado._id != usuario1._id) {
                router.refresh()
            }
            
        }
    }, [username]);


    return (
        
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="overflow-auto rounded-lg shadow-lg lg:p-6 p-2 w-1/3 dark:bg-gray-800 bg-gray-100 lg:h-3/5 h-5/6 lg:w-3/6 w-5/6 text-gray-800 dark:text-gray-300">
                    <div className="mb-5 flex lg:flex-row items-center w-full justify-between">
                        {!password && !editar && !foto && 
                            <div></div>
                        }
                        {editar && 
                            <div className="mb-2 flex flex-row items-center">
                                <button className="rounded mr-4" onClick={() => setEditar(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                </button> 
                                <h1 className="text-xl font-bold text-black capitalize dark:text-gray-200">Editar Perfil</h1>
                            </div>
                        }
                        {password && 
                            <div className="mb-2 flex flex-row items-center">
                                <button className="rounded mr-4" onClick={() => setPassword(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                </button> 
                                <h1 className="text-xl font-bold text-black capitalize dark:text-gray-200">Cambiar Contraseña</h1>
                            </div>
                        }
                        {foto && 
                            <div className="mb-2 flex flex-row items-center">
                                <button className="rounded mr-4" onClick={() => setFoto(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                </button> 
                                <h1 className="text-xl font-bold text-black capitalize dark:text-gray-200">Cambiar Foto</h1>
                            </div>
                        }

                        <div className="mb-2 flex flex-row items-center">
                            <button className="rounded " onClick={onClose}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button> 
                        </div>
                    </div> 
                    <div>
                        {!password && !editar && !foto &&
                            <div>
                                <button className="justify-between pr-2 flex items-center w-full text-left pl-3 py-4 shadow-lg bg-gray-300 dark:bg-[#232f41] rounded mb-2 " onClick={() => setEditar(true)}>
                                    Editar Datos
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                    </svg>

                                </button>
                                <button className="justify-between pr-2 flex items-center w-full text-left pl-3 py-4 shadow-lg bg-gray-300 dark:bg-[#232f41] rounded mb-2 " onClick={() => setPassword(true)}>
                                    Cambiar Contraseña
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                                <button className="justify-between pr-2 flex items-center w-full text-left pl-3 py-4 shadow-lg bg-gray-300 dark:bg-[#232f41] rounded mb-2 " onClick={() => setFoto(true)}>
                                    Cambiar Foto
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>
                        }
                        {editar &&
                         
                            <div >
                                <form ref={formRef} onSubmit={Validar}>
                                    <div className="grid grid-cols-1 gap-6 lg:mt-4 sm:grid-cols-2">
                                        <div>
                                            <label className="text-black dark:text-gray-200" htmlFor="nombre">Nombre</label>
                                            <input defaultValue={usuario1.nombre} name="nombre" type="text" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.nombre ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300  focus:border-orange-400 dark:focus:border-orange-400 focus:border-2 border-2  focus:outline-none  ring-orange-100 placeholder-red-500`}/>
                                        </div>

                                        <div>
                                            <label className="text-black dark:text-gray-200" htmlFor="apellido">Apellido</label>
                                            <input defaultValue={usuario1.apellido} name="apellido" type="text" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.apellido ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                                        </div>
                                        <div>
                                            <label className="text-black dark:text-gray-200" htmlFor="fechaNacimiento">Fecha de Nacimiento: </label>
                                            <input defaultValue={usuario1.fechaNacimiento.split('T')[0]} name="fechaNacimiento" min={hace100Anios.toISOString().split('T')[0]} max={hace15Anios.toISOString().split('T')[0]}type="date" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.fechaNacimiento ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-400 dark:focus:border-orange-400 focus:border-2 border-2  focus:outline-none  ring-orange-100 placeholder-red-500`}/>
                                        </div>

                                        <div>
                                            <label className="text-black dark:text-gray-200" htmlFor="numeroTlf">Número de Teléfono</label>
                                            <input defaultValue={usuario1.numeroTlf} name="numeroTlf" type="text" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.numeroTlf ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                                        </div>
                                        <div>
                                            <label className="text-black dark:text-gray-200" htmlFor="username">Username</label>
                                            <input defaultValue={usuario1.username} name="username" type="text" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.username ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-400 dark:focus:border-orange-400 focus:border-2 border-2  focus:outline-none  ring-orange-100 placeholder-red-500`}/>
                                        </div>

                                        <div>
                                            <label className="text-black dark:text-gray-200" htmlFor="correo">Correo</label>
                                            <input defaultValue={usuario1.correo} name="correo" type="email" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.correo ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                                        </div>

                                    </div>

                                    <div className="flex justify-center mt-6">
                                        <button className="px-10 py-3 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-800">Editar</button>
                                    </div>
                                </form>
                            </div>
                            
                        }
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
                        {password && 
                        <div>
                            <form ref={formPassword} onSubmit={CambiarPassword}>
                                
                                    <div className="mb-2">
                                        <label className="text-black dark:text-gray-200" htmlFor="password">Contraseña</label>
                                        <input name="password" type="password" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.password ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                                    </div>
                                    <div className="mb-2">
                                        <label className="text-black dark:text-gray-200" htmlFor="confirmPassword">Nueva contraseña</label>
                                        <input name="newPassword" type="password" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.confirmPassword ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                                    </div>
                                    <div className="mb-2">
                                        <label className="text-black dark:text-gray-200" htmlFor="confirmPassword">Confirmación de nueva contraseña</label>
                                        <input name="confirmNewPassword" type="password" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.confirmPassword ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                                    </div>

                           

                                <div className="flex justify-center mt-6">
                                    <button className="px-10 py-3 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-800">Editar</button>
                                </div>
                            </form>
                        </div>
                            
                        }
                        {foto && 
                            <div>
                                <form ref={formRefImg} onSubmit={ValidarImg} encType="multipart/form-data">
                                <div>
                                    <label className="text-black dark:text-gray-200" >Introduce foto de equipo nueva</label>
                                    <label className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white  rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 hover:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`} htmlFor="fotoEquipo">{Img}</label>
                                    <input onChange={(e) =>{
                                        const file = e.target.files ? e.target.files[0] : null;
                                        setImg(file ? file.name : 'No hay imagen seleccionada')
                                    }} name="foto" accept="image/*" id="fotoEquipo" type="file" className={`hidden block w-full px-4 py-2 mt-2 text-gray-700 bg-white rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                                </div>
                            

                            <div className="flex justify-center mt-6">
                                <button className="px-10 py-3 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-800">Actualizar Foto</button>
                            </div>
                        </form>
                            </div>
                        }

                    </div>
                </div>
            </div>
    )

}
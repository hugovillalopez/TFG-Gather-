import { useEffect, useRef, useState } from "react"
import { fetchUsuarioById, verificarId } from "../../../lib/usuarios";
import { createQuedada, fetchQuedadaById, updateQuedada } from "../../../lib/quedadas";
import { useParams, useRouter } from "next/navigation";
import deportes from "../../deportes";
import { buscarUsuarioId, verificar } from "@/app/funciones";


export default function EditarGather ({onClose}) {
    const [usuarioLogueado,setUsuarioLogueado] = useState({})
    const [errores,setErrores] = useState({})
    const [mostrarQuedada,setMostrarQuedada] = useState({})
    const [usuarioQuedada,setUsuarioQuedada] = useState({})
    const formRef = useRef(null)
    const router = useRouter()
    const params = useParams()
    const {quedada} = params
    const [mostrarErrores,setMostrarErrores] = useState(false)
    const hoy = new Date(); 
    const mañana = new Date(hoy); 
    mañana.setDate(hoy.getDate() + 1); 
    const fechaLimite = new Date(hoy); 
    fechaLimite.setFullYear(hoy.getFullYear() + 1);


    const buscarQuedada = async (quedada) =>{
        try {
            const response = await fetchQuedadaById(quedada)
            return response
        } catch (error) {
            console.log(error.message)
        }
    }

    const editar = async (quedada) =>{
        try {
            const response = await Promise.all([updateQuedada(mostrarQuedada._id,quedada)])
            console.log(response[0])
            onClose(response[0])
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
            fecha: form.fecha.value,
            horaInicio: form.horaInicio.value,
            horaFin: form.horaFin.value,
            lugar: form.lugar.value,
            usuario: usuarioLogueado._id,
            deporte: form.deporte.value,
            visibilidad: form.visibilidad.value,
            minAsistentes: form.minAsistentes.value,
            maxAsistentes: form.maxAsistentes.value,
        }

        let error = false
        let erroresTemp = {}

        Object.keys(datos).forEach((e) =>{
            
            switch (e) {
                case 'nombre':
                    if(datos[e].match(/^[A-Za-z0-9\s]+$/) == null || datos[e] == ""){
                        error = true
                        form[e].placeholder = `Campo NOMBRE vacio`
                        erroresTemp[e] = "Campo NOMBRE no correcto o vacio"
                    }
                    break;
                case 'fecha':
                    const fecha = new Date(datos[e])
                    if(fecha < mañana && fecha > fechaLimite || datos[e] == ""){
                        error = true
                        form[e].placeholder = `Campo FECHA vacio`
                        erroresTemp[e] = "Campo FECHA no correcto o vacio"
                    }  
                    break;
                case 'horaInicio':
                    if(datos[e].match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/) == null || datos[e] == ""){
                        error = true
                        form[e].placeholder = `Campo HORA DE INICIO vacio`
                        erroresTemp[e] = "Campo HORA DE INICIO no correcto o vacio"
                    }
                    break;
                case 'horaFin':
                    if(datos[e].match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/) == null || datos[e] == ""){
                        error = true
                        form[e].placeholder = `Campo HORA DE FINALIZACION vacio`
                        erroresTemp[e] = "Campo HORA DE FINALIZACION no correcto o vacio"
                    }
                    
                    break;
                case 'lugar':
                    if(datos[e] == ""){
                        error = true
                        form[e].placeholder = `Campo LUGAR vacio`
                        erroresTemp[e] = "Campo LUGAR no correcto o vacio"
                    }
                    break;
                case 'deporte':
                    if(datos[e] == ""){
                        error = true
                        form[e].placeholder = `Campo DEPORTE vacio`
                        erroresTemp[e] = "Campo DEPORTE no correcto o vacio"
                    }
                    
                    break;
                case 'minAsistentes':
                    if(datos[e].match(/^[0-9]{1,2}$/) == null || datos[e] == ""){
                        error = true
                        form[e].placeholder = `Campo MINIMO DE ASISTENTES vacio`
                        erroresTemp[e] = "Campo MINIMO DE ASISTENTES no correcto o vacio"
                    }
                    
                    break;
                case 'maxAsistentes':
                    if(datos[e].match(/^[0-9]{1,3}$/) == null || datos[e] == "" || parseInt(datos[e],10) < parseInt(datos['minAsistentes'],10)){
                        error = true
                        form[e].placeholder = `Campo MÁXIMO DE ASISTENTES vacio`
                        erroresTemp[e] = "Campo MÁXIMO DE ASISTENTES no correcto o vacio"
                    }
                    
                    break;
                default:
                    break;
            }
        })

        if (!error) {
            const inicio = new Date(`1970-01-01T${datos['horaInicio']}:00`); 
            const fin = new Date(`1970-01-01T${datos['horaFin']}:00`);
            if (inicio > fin) {
                erroresTemp['horas'] = "HORA DE INICIO es mas tarde a la de FINALIZACION"
                setErrores(erroresTemp)
            } else {
                const unaHoraMasTarde = new Date(inicio); 
                unaHoraMasTarde.setHours(inicio.getHours() + 1);
                if (fin < unaHoraMasTarde) {
                    erroresTemp['horas'] = "HORA DE FINALIZACION es mas pronto a una hora de la de INICIO"
                    setErrores(erroresTemp)
                }else{
                    editar(datos)
                }
            }
        }else{
            setErrores(erroresTemp)
            setMostrarErrores(true)
        }


    }

    useEffect(() =>{
        if (quedada) {
            const fetchAndSetQuedada = async () => {
                const Quedada = await buscarQuedada(quedada);
                const User = await buscarUsuarioId(Quedada.usuario);
                setMostrarQuedada(Quedada);
                setUsuarioQuedada(User);
            };
            fetchAndSetQuedada();
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
            if (usuarioLogueado._id != usuarioQuedada._id) {
                router.refresh()
            }
        }
        
    },[])

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="overflow-auto rounded-lg shadow-lg p-6 w-1/3 dark:bg-gray-800 bg-gray-100 h-5/6 lg:w-3/6 w-5/6 text-gray-800 dark:text-gray-300">
                    <div className="mb-5 flex flex-row items-center w-full justify-between">
                        <div className="mb-2 flex flex-row items-center">
                            <h1 className="text-xl font-bold text-black capitalize dark:text-gray-200">Editar Perfil</h1>
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
                        <form ref={formRef} onSubmit={Validar}>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-black dark:text-gray-200 w-full" htmlFor="nombre">Nombre</label>
                                    <input defaultValue={mostrarQuedada.nombre} name="nombre" type="text" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.nombre ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300  focus:border-orange-400 dark:focus:border-orange-400 focus:border-2 border-2  focus:outline-none  ring-orange-100 placeholder-red-500`}/>
                                </div>

                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="deporte">Deporte</label>
                                    <select value={mostrarQuedada.deporte} name="deporte"  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500">
                                        <option value=""></option>
                                        {deportes.map(e =>(
                                            <option key={e} value={e}>{e}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="lugar">Lugar</label>
                                    <input defaultValue={mostrarQuedada.lugar} name="lugar" type="text" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.lugar ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                                </div>

                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="fecha">Fecha</label>
                                    <input defaultValue={mostrarQuedada.fecha} name="fecha" type="date" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.fecha ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                                </div>

                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="horaInicio">Hora de Inicio</label>
                                    <input defaultValue={mostrarQuedada.horaInicio} name="horaInicio" type="text" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.horaInicio ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                                </div>

                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="horaFin">Hora de Finalización</label>
                                    <input defaultValue={mostrarQuedada.horaFin} name="horaFin" type="text" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.horaFin ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-400 dark:focus:border-orange-400 focus:border-2 border-2  focus:outline-none  ring-orange-100 placeholder-red-500`}/>
                                </div>
                                
                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="minAsistentes">Minimo número de asistentes</label>
                                    <input defaultValue={mostrarQuedada.minAsistentes} name="minAsistentes" type="number" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.minAsistentes ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}/>
                                </div>

                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="maxAsistentes">Máximo número de asistentes</label>
                                    <input defaultValue={mostrarQuedada.maxAsistentes} name="maxAsistentes" type="number" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${errores.maxAsistentes ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600" } rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-400 dark:focus:border-orange-400 focus:border-2 border-2  focus:outline-none  ring-orange-100 placeholder-red-500`}/>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="text-black dark:text-gray-200" htmlFor="visibilidad">Visibilidad</label>
                                    <select value={mostrarQuedada.visibilidad} name="visibilidad" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500">
                                        <option value="Publico">Publico</option>
                                        <option value="Seguidores">Seguidores</option>
                                    </select>
                                </div>

                            </div>

                            <div className="flex justify-center mt-6">
                                <button className="px-10 py-3 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-800">Editar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )

}
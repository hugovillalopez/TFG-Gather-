import { useRouter } from "next/navigation";
import { fetchUsuarioById, fetchUsuarioByUsername, seguir, verificarId } from "./lib/usuarios";
import { fetchEquipoById } from "./lib/equipos";

export const verificar = async (token: string) => {
    try {
        const envioToken = await verificarId(token);
        return envioToken;
    } catch (error) {
        return { error: error.message };
    }
};

export const buscarUsuarioId = async (usuario: string) =>{
    try {
        const response = await fetchUsuarioById(usuario)
        return response
    } catch (error) {
        console.log(error.message)
    }    
}

export const buscarUsuario = async (usuario) =>{
    const username = {
        username: usuario
    }
    if (usuario) {
        try {
            const response = await fetchUsuarioByUsername(username)
            if (response != null) {
                return response
            } else {
                router.push('/dashboard')
            }
           
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const seguirUsuario = async (seguido,seguidor) =>{
    try {
        const response = await seguir(seguido,seguidor,false)
        console.log(response) 
    } catch (error) {
        console.log(error.message)
    }
}

export const dejarSeguirUsuario = async (seguido,seguidor) =>{
    try {
        const response = await seguir(seguido,seguidor,true)
        console.log(response) 
    } catch (error) {
        console.log(error.message)
    }
}

export const convertirAFormData = (datos) => {
    const formData = new FormData();
    // Recorremos el objeto y agregamos sus claves y valores a FormData
    for (const key in datos) {
      if (datos.hasOwnProperty(key)) {
       
        if (datos[key] instanceof File) {
            
          // Si el valor es un archivo, lo añadimos directamente
          formData.append(key, datos[key]);
        } else {
          // Convertimos los demás valores a string antes de añadirlos
          formData.append(key, datos[key].toString());
        }
      }
    }
    
    return formData;
  };

export const fetchUsuarios = async (userIds) => { 
    try { 
        const responses = await Promise.all(userIds.map(_id => fetchUsuarioById(_id))); 
        return responses; 
    } catch (error) { 
        console.error('Error fetching usuarios:', error); 
    } 
}

const fetchEquipos = async (equiposIds) => { 
            try { 
                const responses = await Promise.all(equiposIds.map(_id => fetchEquipoById(_id))); 
                return responses; 
            } catch (error) { 
                console.error('Error fetching usuarios:', error); 
            } 
        }

export const conseguirEquipos = async (usuario) =>{
        if (usuario.equipos && usuario.equipos.length > 0) { 
            const equiposData = await fetchEquipos(usuario.equipos); 
            return equiposData; 
        } else {
            return []
        }
    }
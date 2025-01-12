import fetch from 'node-fetch'
import bcrypt from 'bcrypt'
import { DateTime } from 'luxon';



export const insertarUsuarios = async () => {
    const usuarios = [
        {
            "nombre": "Juan",
            "apellido": "Pérez",
            "username": "juanp",
            "correo": "juanp@example.com",
            "password": "password1",
            "fechaNacimiento": "1990-01-01",
            "numeroTlf": 600000001
        },
        {
            "nombre": "María",
            "apellido": "González",
            "username": "mariag",
            "correo": "mariag@example.com",
            "password": "password2",
            "fechaNacimiento": "1991-02-02",
            "numeroTlf": 600000002
        },
        {
            "nombre": "Carlos",
            "apellido": "Rodríguez",
            "username": "carlosr",
            "correo": "carlosr@example.com",
            "password": "password3",
            "fechaNacimiento": "1992-03-03",
            "numeroTlf": 600000003
        },
        {
            "nombre": "Ana",
            "apellido": "López",
            "username": "anal",
            "correo": "anal@example.com",
            "password": "password4",
            "fechaNacimiento": "1993-04-04",
            "numeroTlf": 600000004
        },
        {
            "nombre": "Luis",
            "apellido": "Martínez",
            "username": "luism",
            "correo": "luism@example.com",
            "password": "password5",
            "fechaNacimiento": "1994-05-05",
            "numeroTlf": 600000005
        },
        {
            "nombre": "Elena",
            "apellido": "García",
            "username": "elenag",
            "correo": "elenag@example.com",
            "password": "password6",
            "fechaNacimiento": "1995-06-06",
            "numeroTlf": 600000006
        },
        {
            "nombre": "Pedro",
            "apellido": "Hernández",
            "username": "pedroh",
            "correo": "pedroh@example.com",
            "password": "password7",
            "fechaNacimiento": "1996-07-07",
            "numeroTlf": 600000007
        },
        {
            "nombre": "Laura",
            "apellido": "Ramírez",
            "username": "laurar",
            "correo": "laurar@example.com",
            "password": "password8",
            "fechaNacimiento": "1997-08-08",
            "numeroTlf": 600000008
        },
        {
            "nombre": "Fernando",
            "apellido": "Díaz",
            "username": "fernandod",
            "correo": "fernandod@example.com",
            "password": "password9",
            "fechaNacimiento": "1998-09-09",
            "numeroTlf": 600000009
        },
        {
            "nombre": "Sofía",
            "apellido": "Ruiz",
            "username": "sofiar",
            "correo": "sofiar@example.com",
            "password": "password10",
            "fechaNacimiento": "1999-10-10",
            "numeroTlf": 600000010
        },
        {
            "nombre": "Miguel",
            "apellido": "Torres",
            "username": "miguelt",
            "correo": "miguelt@example.com",
            "password": "password11",
            "fechaNacimiento": "2000-11-11",
            "numeroTlf": 600000011
        },
        {
            "nombre": "Carmen",
            "apellido": "Flores",
            "username": "carmenf",
            "correo": "carmenf@example.com",
            "password": "password12",
            "fechaNacimiento": "2001-12-12",
            "numeroTlf": 600000012
        },
        {
            "nombre": "Francisco",
            "apellido": "Morales",
            "username": "franciscom",
            "correo": "franciscom@example.com",
            "password": "password13",
            "fechaNacimiento": "2002-01-13",
            "numeroTlf": 600000013
        },
        {
            "nombre": "Daniela",
            "apellido": "Ortiz",
            "username": "danielao",
            "correo": "danielao@example.com",
            "password": "password14",
            "fechaNacimiento": "2003-02-14",
            "numeroTlf": 600000014
        },
        {
            "nombre": "Alberto",
            "apellido": "Jiménez",
            "username": "albertoj",
            "correo": "albertoj@example.com",
            "password": "password15",
            "fechaNacimiento": "2004-03-15",
            "numeroTlf": 600000015
        },
        {
            "nombre": "Lucía",
            "apellido": "Vega",
            "username": "luciav",
            "correo": "luciav@example.com",
            "password": "password16",
            "fechaNacimiento": "2005-04-16",
            "numeroTlf": 600000016
        },
        {
            "nombre": "Jorge",
            "apellido": "Molina",
            "username": "jorgem",
            "correo": "jorgem@example.com",
            "password": "password17",
            "fechaNacimiento": "2006-05-17",
            "numeroTlf": 600000017
        },
        {
            "nombre": "Patricia",
            "apellido": "Navarro",
            "username": "patrician",
            "correo": "patrician@example.com",
            "password": "password18",
            "fechaNacimiento": "2007-06-18",
            "numeroTlf": 600000018
        },
        {
            "nombre": "Raúl",
            "apellido": "Santos",
            "username": "rauls",
            "correo": "rauls@example.com",
            "password": "password19",
            "fechaNacimiento": "2008-07-19",
            "numeroTlf": 600000019
        },
        {
            "nombre": "Natalia",
            "apellido": "Castro",
            "username": "nataliac",
            "correo": "nataliac@example.com",
            "password": "password20",
            "fechaNacimiento": "2009-08-20",
            "numeroTlf": 600000020
        }

];

const saltRounds = 10;
    
for (const usuario of usuarios) {
       
        // Make the POST request to the API
        try {
            const response = await fetch('http://localhost:3000/gather/postUsuario', { // Cambia la URL si es necesario
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            if (response.ok) {
                console.log(`Usuario ${usuario.username} insertado correctamente.`);
            } else {
                console.error(`Error al insertar usuario ${usuario.username}:`, response.statusText);
            }
        } catch (error) {
            console.error(`Error al insertar usuario ${usuario.username}:`, error.message);
        }
    }
};

export const conseguirEstado = (fecha, horaInicio, horaFin) =>{
    const ahora = DateTime.now()

    const fechaInicio = DateTime.fromISO(`${fecha}T${horaInicio}`)
    const fechaFin = DateTime.fromISO(`${fecha}T${horaFin}`)

    if(ahora < fechaInicio){
        return "Inscripción Abierta"
    } else if (ahora >= fechaInicio && ahora <= fechaFin) {
        return "En curso"
    } else {
        return "Finalizada"
    }

}

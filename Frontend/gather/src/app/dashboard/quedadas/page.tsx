"use client";
import { FC } from "react"
import { fetchQuedadas } from "../../lib/quedadas";
import { fetchUsuarios } from "../../lib/usuarios";
import { useEffect, useState } from "react";
import { Divider } from "@mantine/core";

export const QuedadasPage:FC = () =>{
    const [Quedada, setQuedada] = useState([]);
    const [Usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
        try {
            const [quedadasResponse, usuariosResponse] = await Promise.all([
                fetchQuedadas(),
                fetchUsuarios(),
            ]);

            if (quedadasResponse) {
                setQuedada(quedadasResponse);
            }

            if (usuariosResponse) {
                setUsuarios(usuariosResponse);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching data:", error);
        }
        };

        getData();
    }, []);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            
            {Quedada.map((quedada) => (
                <div key={quedada._id}>
                <p>{quedada.fecha}</p>
                <p>{quedada.hora}</p>
                <p>{quedada.lugar}</p>
                <p>{quedada.usuario}</p>
                <p>{quedada.deporte}</p>
                <p>{quedada.valoracion}</p>
            </div>
            
            ))}
            
        </div>
        
    )
}
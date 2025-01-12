"use client";
import { FC, useEffect, useState, ReactNode } from "react";
import { verificarId } from "../lib/usuarios";
import { useRouter } from "next/navigation";
import { verificar } from "../funciones";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const router = useRouter();
    const [verificado, setVerificado] = useState<boolean | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            verificar(token).then(dato => {
                if (dato.autenticado === true) {
                    setVerificado(true);
                } else {
                    router.push("/");
                }
            });
        } else {
            router.push("/");
        }
    }, [router]);

    if (verificado === null) {
        return <p>Verificando...</p>;
    }

    if (verificado) {
        return <>{children}</>;
    }

    return null;
};

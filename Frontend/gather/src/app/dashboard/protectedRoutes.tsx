"use client";
import { FC, useEffect, useState, ReactNode } from "react";
import { verificarId } from "../lib/usuarios";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const router = useRouter();
    const [verificado, setVerificado] = useState<boolean | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const verificar = async (token: string) => {
                try {
                    const envioToken = await verificarId(token);
                    return envioToken;
                } catch (error) {
                    return { error: error.message };
                }
            };

            verificar(token).then(dato => {
                if (dato.autenticado === false) {
                    router.push("/");
                } else {
                    sessionStorage.setItem("usuario",dato.usuario.id)
                    setVerificado(true);
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

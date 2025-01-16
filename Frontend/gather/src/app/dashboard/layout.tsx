"use client";
import '@mantine/core/styles.css'
import Link from "next/link";
import {ProtectedRoute} from '../dashboard/protectedRoutes';
import '../globals.css'
import Menu from './menu';
import Buscador from './buscador';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { buscarUsuarioId, verificar } from '../funciones';
import Image from 'next/image';

export default function DashboardLayout({
  children,}: Readonly<{children: React.ReactNode;}>) {

    const [usuarioLogueado, setUsuarioLogueado] = useState({});
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {         
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
    }, []);

  return (
    <html lang="en"> 
      <body>
        <nav style={{borderBottom: "5px solid #F6AD55",}} className=" sticky top-0 z-10 w-full flex-nowrap items-center justify-between bg-gray-300 py-2 shadow-dark-mild lg:flex-wrap lg:justify-start dark:bg-gray-800">
          <div className="flex w-full flex-wrap items-center justify-between lg:px-3">
            <div>
              <Link className="lg:mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" href="/dashboard">
                <Image
                  id="logo"
                  className="lg:me-2"
                  src="/images/gatherLogo.png"
                  alt="TE Logo"
                  width="40"
                  height="40"
                  loading="lazy" />
                <span className="text-black dark:text-white text-sm hidden md:block">GATHER</span>
              </Link>
            </div>
            <div className='mr-5 lg:hidden'>
              <Link href={`/dashboard/user/${usuarioLogueado.username}`}>
                <div className=" flex items-center items-center text-left gap-4">
                    <Image width="40" height="40" src={usuarioLogueado.foto || "/images/users.webp"} alt="avatar" className="border border-orange-400 inline-block relative object-cover object-center !rounded-full w-8 h-8" />
                    <div className="justify-start">
                      <h6 className="text-slate-800 dark:text-gray-300 font-semibold hover:text-orange-400">
                          {usuarioLogueado.username}
                      </h6>
                    </div>
                    
                </div>
              </Link>
            </div>
          </div>
        </nav>
          <ProtectedRoute>
            {/*<MantineProvider>
              <Grid align="stretch" className="pt-6">
                <Grid.Col span={2.5}><Menu/></Grid.Col>
                <Grid.Col className="rounded overflow-hidden shadow-lg dark:bg-gray-800 bg-gray-200" span={6}>{children}</Grid.Col>
                <Grid.Col span={3.5}><Buscador/></Grid.Col>
              </Grid>
            </MantineProvider>*/}
            <div className=" w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 pt-4 ">

              <div className="z-10 lg:relative lg:w-auto lg:pl-10 lg:flex lg:flex-col items-center fixed bottom-0 left-0 w-full md:fixed md:bottom-0 md:left-0  lg:col-span-2 ">
                <Menu />
              </div>

              <div className={`overflow-auto h-full lg:ml-10 mb-10 lg:mb-0  rounded  shadow-lg dark:bg-gray-800 bg-gray-200  ${!pathname.startsWith("/dashboard/quedadas/") && !pathname.startsWith("/dashboard/explorar")? "md:col-span-6" : "lg:col-span-9 md:col-span-9 sm:mr-5"} `}>
                {children}
              </div>

              {!pathname.startsWith("/dashboard/quedadas/") && !pathname.startsWith("/dashboard/explorar") &&  
              <div className="hidden lg:block  lg:col-span-4 ">
                
                <div className="text-center">
                  <Buscador />
                </div>
              </div>
              }
            </div>

          
    </ProtectedRoute>

      </body>
    </html>
  );
}

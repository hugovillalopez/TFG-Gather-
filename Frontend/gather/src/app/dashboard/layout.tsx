"use client";
import '@mantine/core/styles.css'
import Link from "next/link";
import {ProtectedRoute} from './protectedRoutes';
import '../globals.css'
import { Grid, MantineProvider } from '@mantine/core';
import Menu from './menu';
import Buscador from './buscador';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en"> 
      <body>
        <nav style={{borderBottom: "5px solid #F6AD55",}} className="relative flex w-full flex-nowrap items-center justify-between bg-light-100 py-2 shadow-dark-mild lg:flex-wrap lg:justify-start lg:py-4 dark:bg-gray-800">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <div>
              <a className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" href="#">
                <img
                  id="logo"
                  className="me-2"
                  src="/images/gatherLogo.png"
                  alt="TE Logo"
                  loading="lazy" />
                <span className="text-black dark:text-white">GATHER</span>
              </a>
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 pt-4">

              <div className="lg:pl-20 sm:flex sm:flex-col sm:items-center sm:fixed sm:bottom-0 sm:left-0 sm:h-16 sm:w-full md:relative md:h-auto md:w-auto lg:col-span-2">
                <Menu />
              </div>

              <div className="lg:ml-20 md:col-span-1 rounded overflow-hidden shadow-lg dark:bg-gray-800 bg-gray-200  lg:col-span-6">
                {children}
              </div>


              <div className="ml-10 hidden md:block lg:col-span-4 ">
                
                <div className="text-center">
                  <Buscador />
                </div>
              </div>
            </div>

          
    </ProtectedRoute>

      </body>
    </html>
  );
}

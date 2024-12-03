"use client";
import Image from "next/image";
import '@mantine/core/styles.css'
import { fetchQuedadas } from "./lib/quedadas";
import { fetchUsuarios } from "./lib/usuarios";
import { useEffect, useState } from "react";
import { MainPage } from "./components/MainPage";
import { MantineProvider } from "@mantine/core";
import { Login } from "./components/Login";

export default function Home() {
 
  return (
    <MantineProvider>
      <Login/>
    </MantineProvider>
    
  );
}

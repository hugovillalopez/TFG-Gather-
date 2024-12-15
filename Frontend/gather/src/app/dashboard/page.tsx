"use client";
import { Card, Grid, rem, Image, Group, Text, Badge, Button, Divider, MantineProvider,} from "@mantine/core"
import { FC } from "react"
import { QuedadasPage } from "./quedadas/page"
import Buscador  from './buscador'
import Menu from "./menu";
import {ProtectedRoute} from "./protectedRoutes";



export default function MainPage(){
    

    return (
        
        <QuedadasPage></QuedadasPage>
        
    )

}

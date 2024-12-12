"use client";
import { Card, Grid, rem, Image, Group, Text, Badge, Button, Divider, MantineProvider,} from "@mantine/core"
import { FC } from "react"
import { QuedadasPage } from "./quedadas/page"
import Buscador  from './buscador'
import Menu from "./menu";
import {ProtectedRoute} from "./protectedRoutes";



export default function MainPage(){
    

    return (
        
        <MantineProvider>
            <Grid align="stretch" className="pt-6">
                <Grid.Col span={3}><Menu/></Grid.Col>
                <Grid.Col className="rounded overflow-hidden shadow-lg dark:bg-gray-800 bg-gray-200" span={5}><QuedadasPage/></Grid.Col>
                <Grid.Col span={4}><Buscador/></Grid.Col>
            </Grid>
        </MantineProvider>
        
    )

}

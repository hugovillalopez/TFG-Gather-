import { Card, Grid, rem, Image, Group, Text, Badge, Button, Divider } from "@mantine/core"
import { FC } from "react"
import { QuedadasPage } from "./QuedadasPage"



export const MainPage:FC = () =>{
    

    return (
        <Grid justify="center" align="stretch">
            <Grid.Col span={4} style={{ minHeight: rem(80), heigth: "100%", }}>HOLA</Grid.Col>
            <Grid.Col span={4} style={{ minHeight: rem(120), heigth: "100%", }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <QuedadasPage/>
            </Card>
            </Grid.Col>
            <Grid.Col span={4} style={{ minHeight: rem(80), heigth: "100%", }}>HOLA</Grid.Col>
        </Grid>
    )

}


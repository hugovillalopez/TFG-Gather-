import { Button, Card, Grid, rem, TextInput } from "@mantine/core";
import { FC } from "react";


export const Login:FC = () =>{
    

    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
            <Card shadow="xl" padding="xl" radius="md" withBorder style={{width:"500px", borderColor:"orange", }}>
                <form /*onSubmit={form.onSubmit((values) => setSubmittedValues(JSON.stringify(values, null, 2)))}*/>
                    <TextInput label="First name" placeholder="First name" /*key={form.key('firstName')} {...form.getInputProps('firstName')}*//>
                    <TextInput label="Last name" placeholder="Last name" mt="md" /*key={form.key('lastName')} {...form.getInputProps('lastName')}*//>
                    <TextInput type="number" label="Age" placeholder="Age" mt="md" /*key={form.key('age')} {...form.getInputProps('age')}*/ />
                    <Button type="submit" mt="md" style={{background:"orange",}}>Submit</Button>   
                </form>
            </Card>
        </div>
    )

}
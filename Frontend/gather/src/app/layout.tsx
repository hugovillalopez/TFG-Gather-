"use client";
import "./globals.css";
import '@mantine/core/styles.css'
import { LoadScript } from "@react-google-maps/api";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en"> 
      <body>
        
      <LoadScript googleMapsApiKey="AIzaSyCWOL7uDvqlFYUgIgFfEoekjv7jIJuSHxI">
        {children}
      </LoadScript>

      </body>
    </html>
  );
}

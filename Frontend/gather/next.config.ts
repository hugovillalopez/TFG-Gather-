import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() { 
    return [ 
      { 
        source: '/gather/:path*', 
        destination: 'http://localhost:3001/gather/:path*', // Cambia esto a la dirección de tu servidor de Express }, ]; },
      },
    
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gather-7308.s3.eu-north-1.amazonaws.com', // El dominio de S3
        pathname: '/uploads/**', // Puedes agregar una ruta específica si es necesario
      },
    ],
  },
}

export default nextConfig;

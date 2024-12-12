import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() { 
    return [ 
      { 
        source: '/gather/:path*', 
        destination: 'http://localhost:3001/gather/:path*', // Cambia esto a la dirección de tu servidor de Express }, ]; },
      },
    
    ];
  }
}

export default nextConfig;

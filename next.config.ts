import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "geracodigo.com.br" }],
        destination: "https://www.geracodigo.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
      },

      webpack(config) {
        config.module.rules.push({
          test: /\.(mp3|wav)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash][ext]',
          },
        });
    
        return config;
      }
};

export default nextConfig;


const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    position: 'bottom-right',
  },
  images: {
    domains: ['la-reverie.github.io'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/files',
          outputPath: 'static/files',
          name: '[name].[hash].[ext]',
        },
      },
    });
    return config;
  },
  // Remove the experimental.mdxRs property
}

// Remove the withMDX wrapper
module.exports = nextConfig;
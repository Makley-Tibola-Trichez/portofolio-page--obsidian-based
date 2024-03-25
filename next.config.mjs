import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = withMDX()({

  pageExtensions: ['tsx', 'mdx']
});

export default nextConfig;

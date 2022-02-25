/** @type {import('next').NextConfig} */
const nextConfig = {
	generateBuildId: () => 'build',
	distDir: 'build',
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		optimizeImages: true,
		optimizeCss: true,
		scrollRestoration: true
	}
}

module.exports = nextConfig

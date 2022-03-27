/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

const nextConfig = {
	generateBuildId: () => 'build',
	distDir: 'build',
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		optimizeImages: true,
		optimizeCss: true,
		scrollRestoration: true
	},
	pwa: {
		dest: 'public'
	}
}

module.exports = withPWA(nextConfig)

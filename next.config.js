/**
 * @type {import('next').NextConfig}
 */
const withPWA = require('next-pwa')({
	dest: 'public',
	buildExcludes: [
		/middleware-build-manifest.js$/,
		/middleware-react-loadable-manifest.js$/
	],
	disable: false
})

const nextConfig = withPWA({
	distDir: 'build',
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		optimizeCss: true,
		enableUndici: true,
		scrollRestoration: true
	}
})

module.exports = nextConfig

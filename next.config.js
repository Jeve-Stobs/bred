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
	i18n: {
		locales: ['en'],
		defaultLocale: 'en'
	},
	pwa: {
		dest: 'public',
		buildExcludes: [
			/middleware-build-manifest.js$/,
			/middleware-react-loadable-manifest.js$/
		]
	},
	enabled: true
}

module.exports = withPWA(nextConfig)

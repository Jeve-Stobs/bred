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
	}),
	withPreact = require('next-plugin-preact')

const nextConfig = withPreact(
	withPWA({
		distDir: 'build',
		reactStrictMode: true,
		swcMinify: true,
		experimental: {
			optimizeCss: true,
			scrollRestoration: true
		}
	})
)

module.exports = nextConfig

module.exports = {
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

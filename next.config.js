module.exports = {
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: 'http://127.0.0.1:8080/:path*' // Proxy to Backend
            }
        ]
    }
}
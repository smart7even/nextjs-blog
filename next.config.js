module.exports = {
    async rewrites() {
        if (process.env.NODE_ENV === 'production') return []

        return []

        // return [
        //     {
        //         source: '/api/:path*',
        //         destination: 'http://127.0.0.1:8080/:path*' // Proxy to Backend
        //     }
        // ]
    }
}
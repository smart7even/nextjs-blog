module.exports = {
    transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
    webpack: (config) => {
        // this will override the experiments
        config.experiments = { ...config.experiments, topLevelAwait: true };
        // this will just update topLevelAwait property of config.experiments
        // config.experiments.topLevelAwait = true 
        return config;
    },
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
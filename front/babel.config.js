module.exports = function(api) {
    api.cache(true);

    const presets = [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "10"
                }
            }
        ],
        "@babel/preset-react"
    ];
    const plugins = [
        //"@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-classes",
        // to JEST
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-async-to-generator',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-transform-react-jsx'
    ];

    return {
        presets,
        plugins
    };
};

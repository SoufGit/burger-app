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
        "@babel/plugin-transform-classes"
    ];

    return {
        presets,
        plugins
    };
};

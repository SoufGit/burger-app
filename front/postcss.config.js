module.exports = ({ file, options, env }) => ({
    plugins: {
        // 'postcss-preset-env': {
        //     browsers: 'ie 11',
        // },
        // 'cssnano': env === 'production' ? {} : false,
        'autoprefixer': {
            browsers: ['last 2 versions', 'ie > 10']
        }
    }
});
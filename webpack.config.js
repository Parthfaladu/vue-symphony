var Encore = require('@symfony/webpack-encore');
var dotenv = require('dotenv');
var path = require('path')

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')
    //.addEntry('page1', './assets/js/page1.js')
    //.addEntry('page2', './assets/js/page2.js')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    .configureBabel(() => {}, {
        useBuiltIns: 'usage',
        corejs: 3
    })
    .enableVueLoader()

    // enables Sass/SCSS support
    .enableSassLoader()
    // .configureLoaderRule('eslint', loader => {
    //     loader.test = /\.(jsx?|vue)$/
    // })
    .enableEslintLoader(eslLinterLoaderOptions => {
        eslLinterLoaderOptions.configPath = './.eslintrc.js';
        eslLinterLoaderOptions.cache = false;

        // Encore enforce parser option to babel-eslint and its not compatible with eslint-plugin-vue
        // Check the following link: https://github.com/symfony/webpack-encore/issues/656
        delete eslLinterLoaderOptions.parser;
    })
    .configureLoaderRule('eslint', loader => {
        loader.test = /\.(jsx?|vue)$/;
    })

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    // uncomment if you use API Platform Admin (composer req api-admin)
    //.enableReactPreset()
    //.addEntry('admin', './assets/js/admin.js')

    .configureDefinePlugin(options => {
        const env = dotenv.config();
        
        if (env.error) {
            throw env.error;
        }

        options['process.env'].VUE_APP_BASE_URL = JSON.stringify(env.parsed.BACKEND_URL);
    })
;

let config = Encore.getWebpackConfig();

config.resolve.alias = {
    'vue$': 'vue/dist/vue.esm.js',
    '@': path.resolve(__dirname, 'assets/js'),
    '@components': path.resolve(__dirname, 'assets/js/components'),
    '@assets': path.resolve(__dirname, 'assets/js/assets'),
    '@router': path.resolve(__dirname, 'assets/js/router'),
    '@services': path.resolve(__dirname, 'assets/js/services'),
    '@store': path.resolve(__dirname, 'assets/js/store'),
    '@views': path.resolve(__dirname, 'assets/js/views')
};

config.resolve.extensions = ['*', '.js', '.vue', '.json']

module.exports = config;

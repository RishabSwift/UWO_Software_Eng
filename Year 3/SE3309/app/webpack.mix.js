const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/js/app.js', 'public/js')


mix.setPublicPath('/');


mix.sass('resources/scss/theme.scss', 'resources/css/compiled.css');
// //
mix.styles([
    'resources/css/compiled.css',
    'resources/fonts/feather/feather.css',
    // 'resources/css/select2_custom.css',
], 'public/css/app.css').version();

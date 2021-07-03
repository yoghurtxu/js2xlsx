/**
 * Created by pomy on 03/07/2017.
 */

import uglify from 'rollup-plugin-uglify';

import config from './rollup.config';

config.plugins.push(
    uglify({
        compress: {
            drop_debugger: true,
            drop_console: true
        },
        mangle: true
    })
);

export default {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'js2xlsx',
    dest: 'dist/js2xlsx.min.js',
    plugins: config.plugins
};

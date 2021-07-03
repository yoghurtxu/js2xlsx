/**
 * Created by pomy on 03/07/2017.
 */

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';

export default {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'js2xlsx',
    dest: 'dist/js2xlsx.js',
    plugins: [
        builtins(),
        resolve({
            customResolveOptions: 'node_modules',
            jsnext: true
        }),
        commonjs({
            namedExports: {
                'node_modules/xlsx/xlsx.js': ['utils', 'write', 'read']
            }
        }),
        typescript(),
        babel({
            exclude: 'node_modules/**',
            externalHelpers: true
        })
    ]
}

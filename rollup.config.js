import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.ts',
    output: {
        file: 'build/tezos-adapter.js',
        format: 'cjs',
    },
    plugins: [
        typescript(),
        commonjs(),
    ],
};

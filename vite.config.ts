import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

// const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@layout': path.resolve(__dirname, 'src/layout'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@interfaces': path.resolve(__dirname, 'interfaces'),
		},
    },
})

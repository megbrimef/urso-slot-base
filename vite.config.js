import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  build: {
    outDir: 'build',
    emptyOutDir: true,
    lib: {
      entry: './src/js/index.js',
      name: 'Urso',
      fileName: 'js/index',
      formats: ['es'],
      sourcemap: true,
      
    },
    rollupOptions: {
      external: [], // add external dependencies if needed
      output: {
        inlineDynamicImports: true
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: true,
      mangle: true,
      format: {
        comments: false
      }
    },
  }
});
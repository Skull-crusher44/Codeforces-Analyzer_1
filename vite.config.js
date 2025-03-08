const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  plugins: [react()],
  base: '/Codeforces-Analyzer/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true
  }
});

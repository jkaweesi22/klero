import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
//
// GitHub Pages serves this project from a repository subdirectory, e.g.
//   https://<username>.github.io/klero/
//
// `base` MUST match the repository name exactly (case-sensitive, with
// leading and trailing slashes) or all built asset URLs will 404 once
// deployed, and the page will render blank. If you fork/rename the
// repository, update the value below to match. See README.md for details.
export default defineConfig({
  base: '/klero/',
  plugins: [react(), tailwindcss()],
})

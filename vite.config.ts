import mdx from '@mdx-js/rollup'
import { devtools } from '@tanstack/devtools-vite'
import remarkGfm from 'remark-gfm'
import { defineConfig } from 'vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import neon from './neon-vite-plugin.ts'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    neon,
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm],
      }),
    },
    tanstackStart(),
    viteReact({
      include: /\.(jsx|js|mdx|md|tsx|ts)$/,
    }),
  ],
})

export default config

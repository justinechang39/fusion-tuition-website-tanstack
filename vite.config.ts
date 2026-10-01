import mdx from '@mdx-js/rollup'
import { devtools } from '@tanstack/devtools-vite'
import remarkGfm from 'remark-gfm'
import { defineConfig } from 'vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import neon from './neon-vite-plugin.ts'

const mdxPlugin = mdx({ remarkPlugins: [remarkGfm] })

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    process.env.NEON_AUTO_PROVISION !== 'false' && neon,
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    {
      enforce: 'pre',
      ...mdxPlugin,
      transform(code, id) {
        // MDX's exclude filter strips query strings; leave raw imports to Vite.
        if (/[?&]raw(?:&|$)/.test(id)) return
        return mdxPlugin.transform.call(this, code, id)
      },
    },
    tanstackStart(),
    viteReact({
      include: /\.(jsx|js|mdx|md|tsx|ts)$/,
    }),
  ],
})

export default config

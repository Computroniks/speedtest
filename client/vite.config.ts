// SPDX-FileCopyrightText: 2022 Matthew Nickson <mnickson@sidingsmedia.com>
// SPDX-License-Identifier: MIT

import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },
    build: {
        emptyOutDir: true,
        outDir:"../build/client",
    }
});

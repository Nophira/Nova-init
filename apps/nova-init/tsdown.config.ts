import { defineConfig } from "tsdown";

export default defineConfig({
    entry: ['./src/index.ts'],
    format: 'esm',
    clean: true,
    platform: 'node',
    outputOptions:{
        banner: '#!/usr/bin/env node',
    }
});
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/local-event-discovery/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});

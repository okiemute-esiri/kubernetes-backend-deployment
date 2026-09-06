import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 3000);
const server = createApp().listen(port, () => {
  console.log(`backend listening on port ${port}`);
});

function shutdown(signal: string) {
  console.log(`${signal} received; shutting down`);
  server.close((error) => {
    if (error) {
      console.error("graceful shutdown failed", error);
      process.exit(1);
    }
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

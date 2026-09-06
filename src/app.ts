import express from "express";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.get("/ready", (_req, res) => {
    res.status(200).json({ status: "ready" });
  });

  app.get("/api/v1/info", (_req, res) => {
    res.status(200).json({
      service: "kubernetes-backend-deployment",
      environment: process.env.NODE_ENV ?? "development",
      region: process.env.APP_REGION ?? "local"
    });
  });

  return app;
}
